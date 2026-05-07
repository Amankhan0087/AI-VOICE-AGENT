#Step1: Import Database Objects

from database import init_db, Appointment, get_db
from fastapi import FastAPI, HTTPException, Depends, Request
from sqlalchemy.orm import Session
from sqlalchemy import select
import datetime as dt
import json


#Step3: Create Data Contract Using Pydantic Models

from pydantic import BaseModel

class AppointmentRequest(BaseModel):
    patient_name: str
    reason: str
    start_time: dt.datetime

class AppointmentResponse(BaseModel):
    id: int
    patient_name: str
    reason: str | None
    start_time: dt.datetime
    canceled: bool
    created_at: dt.datetime

class CancelAppointmentRequest(BaseModel):
    patient_name: str
    datetime: dt.datetime

class CancelAppointmentResponse(BaseModel):
    canceled_count: int

class AppointmentsRequest(BaseModel):
    date: dt.date


#Step4: Write Actual Code

init_db()

app = FastAPI()

# Bypass ngrok browser warning for all API responses
@app.middleware("http")
async def add_ngrok_header(request, call_next):
    response = await call_next(request)
    response.headers["ngrok-skip-browser-warning"] = "true"
    return response


# Root — redirect to interactive API docs
@app.get("/")
def root():
    from fastapi.responses import RedirectResponse
    return RedirectResponse(url="/docs")


# Schedule an appointment
@app.post("/schedule_appointment/", response_model=AppointmentResponse)
def schedule_appointment(request: AppointmentRequest, db: Session = Depends(get_db)):
    new_appointment = Appointment(
        patient_name=request.patient_name,
        reason=request.reason,
        start_time=request.start_time
    )

    db.add(new_appointment)
    db.commit()
    db.refresh(new_appointment)

    return AppointmentResponse(
        id=new_appointment.id,
        patient_name=new_appointment.patient_name,
        reason=new_appointment.reason,
        start_time=new_appointment.start_time,
        canceled=new_appointment.canceled,
        created_at=new_appointment.created_at
    )


# Cancel an appointment
@app.post("/cancel_appointment/", response_model=CancelAppointmentResponse)
def cancel_appointment(request: CancelAppointmentRequest, db: Session = Depends(get_db)):
    start_dt = dt.datetime.combine(request.datetime.date(), dt.time.min)
    end_dt = start_dt + dt.timedelta(days=1)

    result = db.execute(
        select(Appointment)
        .where(
            Appointment.patient_name == request.patient_name,
            Appointment.start_time >= start_dt,
            Appointment.start_time < end_dt,
            Appointment.canceled == False
        )
    )

    appointments = result.scalars().all()
    if not appointments:
        raise HTTPException(status_code=404, detail="No appointment found for the given details in our system.")

    for appointment in appointments:
        appointment.canceled = True

    db.commit()

    return CancelAppointmentResponse(canceled_count=len(appointments))


# List appointments
@app.get("/list_appointments/", response_model=list[AppointmentResponse])
def list_appointments(date: dt.date, db: Session = Depends(get_db)):
    start_dt = dt.datetime.combine(date, dt.time.min)
    end_dt = start_dt + dt.timedelta(days=1)

    result = db.execute(
        select(Appointment)
        .where(
            Appointment.canceled == False,
            Appointment.start_time >= start_dt,
            Appointment.start_time < end_dt
        )
        .order_by(Appointment.start_time.asc())
    )

    appointments = result.scalars().all()

    return [
        AppointmentResponse(
            id=appointment.id,
            patient_name=appointment.patient_name,
            reason=appointment.reason,
            start_time=appointment.start_time,
            canceled=appointment.canceled,
            created_at=appointment.created_at
        )
        for appointment in appointments
    ]

# ── Request logger middleware (shows all incoming requests in logs) ───────────
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("backend")

@app.middleware("http")
async def log_requests(request: Request, call_next):
    body = await request.body()
    if body:
        logger.info(f"INCOMING {request.method} {request.url.path} — body: {body.decode()[:500]}")
    response = await call_next(request)
    return response


# ── VAPI Webhook ─────────────────────────────────────────────────────────────
# VAPI sends tool calls in its own format — this endpoint handles that

def _do_schedule(args: dict, db: Session) -> str:
    try:
        patient_name = args.get("patient_name") or args.get("patientName", "")
        reason       = args.get("reason", "General consultation")
        start_time   = args.get("start_time") or args.get("startTime") or args.get("dateTime", "")

        if not patient_name:
            return "I need the patient's name to schedule an appointment."
        if not start_time:
            return "I need the appointment date and time to proceed."

        # Accept ISO strings
        try:
            parsed_time = dt.datetime.fromisoformat(str(start_time))
        except ValueError:
            return f"I couldn't understand the date/time format: {start_time}. Please provide it as YYYY-MM-DDTHH:MM:SS."

        # Sanity check — reject dates more than 2 years in the future or before 2020
        now = dt.datetime.now()
        if parsed_time.year < 2020 or parsed_time > now + dt.timedelta(days=730):
            return (
                f"The date {parsed_time.strftime('%B %d, %Y')} doesn't look right. "
                f"Please confirm the correct appointment date and try again."
            )

        appt = Appointment(patient_name=patient_name, reason=reason, start_time=parsed_time)
        db.add(appt)
        db.commit()
        db.refresh(appt)

        return (
            f"Done! I've booked an appointment for {appt.patient_name} "
            f"on {appt.start_time.strftime('%B %d, %Y')} at {appt.start_time.strftime('%I:%M %p')} "
            f"for {appt.reason}. Appointment ID is {appt.id}."
        )
    except Exception as e:
        return f"There was an error scheduling the appointment: {str(e)}"


def _do_cancel(args: dict, db: Session) -> str:
    try:
        patient_name = args.get("patient_name") or args.get("patientName", "")
        date_str     = args.get("datetime") or args.get("date") or args.get("dateTime", "")

        if not patient_name or not date_str:
            return "I need both the patient name and appointment date to cancel."

        parsed_dt = dt.datetime.fromisoformat(str(date_str))
        start_dt  = dt.datetime.combine(parsed_dt.date(), dt.time.min)
        end_dt    = start_dt + dt.timedelta(days=1)

        result = db.execute(
            select(Appointment).where(
                Appointment.patient_name == patient_name,
                Appointment.start_time >= start_dt,
                Appointment.start_time < end_dt,
                Appointment.canceled == False
            )
        )
        appointments = result.scalars().all()

        if not appointments:
            return f"I couldn't find an active appointment for {patient_name} on {parsed_dt.strftime('%B %d, %Y')}."

        for a in appointments:
            a.canceled = True
        db.commit()

        return f"Done! I've canceled {len(appointments)} appointment(s) for {patient_name} on {parsed_dt.strftime('%B %d, %Y')}."
    except Exception as e:
        return f"There was an error canceling the appointment: {str(e)}"


def _do_list(args: dict, db: Session) -> str:
    try:
        date_str = args.get("date") or args.get("dateTime") or str(dt.date.today())
        parsed   = dt.datetime.fromisoformat(str(date_str))
        start_dt = dt.datetime.combine(parsed.date(), dt.time.min)
        end_dt   = start_dt + dt.timedelta(days=1)

        result = db.execute(
            select(Appointment).where(
                Appointment.canceled == False,
                Appointment.start_time >= start_dt,
                Appointment.start_time < end_dt
            ).order_by(Appointment.start_time.asc())
        )
        appointments = result.scalars().all()

        if not appointments:
            return f"There are no appointments scheduled for {parsed.strftime('%B %d, %Y')}."

        lines = [f"Here are the appointments for {parsed.strftime('%B %d, %Y')}:"]
        for a in appointments:
            lines.append(f"- {a.start_time.strftime('%I:%M %p')}: {a.patient_name} — {a.reason}")
        return " ".join(lines)
    except Exception as e:
        return f"There was an error listing appointments: {str(e)}"


@app.post("/vapi-webhook/")
async def vapi_webhook(request: Request, db: Session = Depends(get_db)):
    body = await request.json()

    message    = body.get("message", {})
    tool_calls = message.get("toolCalls", [])

    # Also support top-level toolCalls (some VAPI versions)
    if not tool_calls:
        tool_calls = body.get("toolCalls", [])

    results = []
    for call in tool_calls:
        call_id  = call.get("id", "")
        function = call.get("function", {})
        name     = function.get("name", "")
        raw_args = function.get("arguments", "{}")

        # arguments can be a JSON string or already a dict
        if isinstance(raw_args, str):
            try:
                args = json.loads(raw_args)
            except json.JSONDecodeError:
                args = {}
        else:
            args = raw_args

        if name in ("scheduleAppointment", "schedule_appointment", "bookAppointment", "book_appointment"):
            result_text = _do_schedule(args, db)
        elif name in ("cancelAppointment", "cancel_appointment"):
            result_text = _do_cancel(args, db)
        elif name in ("listAppointments", "list_appointments", "getAppointments", "get_appointments"):
            result_text = _do_list(args, db)
        else:
            result_text = f"Unknown tool: {name}"

        results.append({"toolCallId": call_id, "result": result_text})

    return {"results": results}


import uvicorn
if __name__ == "__main__":
    uvicorn.run("backend:app", host="127.0.0.1", port=4444, reload=True)
    

