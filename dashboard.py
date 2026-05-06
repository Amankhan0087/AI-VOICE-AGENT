#Step5: Streamlit Dashboard

import streamlit as st
import requests
import datetime
import pandas as pd

DEFAULT_URL = "http://127.0.0.1:4444"

# ── Page Config ───────────────────────────────────────────────────────────────
st.set_page_config(
    page_title="MediBook — Appointment Manager",
    page_icon="🏥",
    layout="wide",
    initial_sidebar_state="expanded",
)

# ── Global CSS ────────────────────────────────────────────────────────────────
st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

html, body, [class*="css"] { font-family: 'Inter', sans-serif; }

/* ── Sidebar ── */
[data-testid="stSidebar"] {
    background: linear-gradient(160deg, #0f172a 0%, #1e3a5f 60%, #1a5276 100%);
    border-right: 1px solid rgba(255,255,255,0.06);
}
[data-testid="stSidebar"] * { color: #e2e8f0 !important; }
[data-testid="stSidebar"] .stRadio label { color: #cbd5e1 !important; }
[data-testid="stSidebar"] hr { border-color: rgba(255,255,255,0.12) !important; }

/* ── Main background ── */
.main .block-container { background: #f1f5f9; padding-top: 2rem; }

/* ── Metric cards ── */
.metric-card {
    background: white;
    border-radius: 14px;
    padding: 22px 24px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.07);
    border-left: 4px solid #3b82f6;
    margin-bottom: 12px;
}
.metric-label {
    font-size: 0.72rem;
    font-weight: 600;
    color: #94a3b8;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}
.metric-value {
    font-size: 2.1rem;
    font-weight: 700;
    color: #0f172a;
    margin: 6px 0 4px 0;
    line-height: 1;
}
.metric-sub {
    font-size: 0.78rem;
    color: #64748b;
}

/* ── Section header ── */
.page-title {
    font-size: 1.7rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 2px;
}
.page-sub {
    font-size: 0.9rem;
    color: #64748b;
    margin-bottom: 1.8rem;
}

/* ── Form container ── */
.form-card {
    background: white;
    border-radius: 14px;
    padding: 32px 36px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.07);
}

/* ── Buttons ── */
.stButton > button {
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: white !important;
    border: none;
    border-radius: 9px;
    padding: 0.65rem 1.5rem;
    font-weight: 600;
    font-size: 0.88rem;
    letter-spacing: 0.02em;
    width: 100%;
    transition: all 0.18s ease;
}
.stButton > button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(37,99,235,0.35);
}

/* ── Status dot in sidebar ── */
.status-dot {
    display: inline-block;
    width: 9px; height: 9px;
    border-radius: 50%;
    margin-right: 8px;
    vertical-align: middle;
}

/* ── Table ── */
[data-testid="stDataFrame"] {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0,0,0,0.07);
}

/* ── Divider ── */
.section-divider {
    border: none;
    border-top: 1px solid #e2e8f0;
    margin: 1.5rem 0;
}

/* ── Info banner ── */
.info-banner {
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    border-radius: 10px;
    padding: 14px 18px;
    color: #1e40af;
    font-size: 0.875rem;
}

/* ── Warning banner ── */
.warn-banner {
    background: #fffbeb;
    border: 1px solid #fde68a;
    border-radius: 10px;
    padding: 14px 18px;
    color: #92400e;
    font-size: 0.875rem;
}

/* ── Hide Streamlit chrome ── */
#MainMenu { visibility: hidden; }
footer    { visibility: hidden; }
header    { visibility: hidden; }
</style>
""", unsafe_allow_html=True)


# ── API Helpers ───────────────────────────────────────────────────────────────
def get_base_url() -> str:
    return st.session_state.get("base_url", DEFAULT_URL).rstrip("/")


def api_schedule(patient_name: str, reason: str, start_time: datetime.datetime):
    try:
        r = requests.post(f"{get_base_url()}/schedule_appointment/", json={
            "patient_name": patient_name,
            "reason": reason,
            "start_time": start_time.isoformat(),
        }, timeout=5)
        return r.json(), r.status_code
    except requests.exceptions.ConnectionError:
        return {"detail": "Cannot connect to backend. Make sure the server is running."}, 503


def api_cancel(patient_name: str, appt_datetime: datetime.datetime):
    try:
        r = requests.post(f"{get_base_url()}/cancel_appointment/", json={
            "patient_name": patient_name,
            "datetime": appt_datetime.isoformat(),
        }, timeout=5)
        return r.json(), r.status_code
    except requests.exceptions.ConnectionError:
        return {"detail": "Cannot connect to backend. Make sure the server is running."}, 503


def api_list(date: datetime.date):
    try:
        r = requests.get(f"{get_base_url()}/list_appointments/", params={"date": str(date)}, timeout=5)
        return r.json(), r.status_code
    except requests.exceptions.ConnectionError:
        return {"detail": "Cannot connect to backend."}, 503


def server_online() -> bool:
    try:
        requests.get(get_base_url(), timeout=2, allow_redirects=False)
        return True
    except Exception:
        return False


# ── Session state defaults ────────────────────────────────────────────────────
if "base_url" not in st.session_state:
    st.session_state["base_url"] = DEFAULT_URL


# ── Sidebar ───────────────────────────────────────────────────────────────────
with st.sidebar:
    st.markdown("""
        <div style='text-align:center; padding: 28px 0 24px 0;'>
            <div style='font-size:3rem; line-height:1;'>🏥</div>
            <div style='font-size:1.25rem; font-weight:700; margin-top:10px; color:#f8fafc;'>MediBook</div>
            <div style='font-size:0.78rem; color:#94a3b8; margin-top:5px; letter-spacing:0.05em;'>
                APPOINTMENT MANAGER
            </div>
        </div>
    """, unsafe_allow_html=True)

    st.divider()

    # ── Backend URL Settings ──
    with st.expander("⚙️ Backend URL Settings", expanded=False):
        url_input = st.text_input(
            "Backend URL",
            value=st.session_state["base_url"],
            placeholder="http://127.0.0.1:4444 or https://xxxx.ngrok-free.app",
            label_visibility="collapsed",
        )
        col_save, col_reset = st.columns(2)
        with col_save:
            if st.button("✅ Save", use_container_width=True):
                st.session_state["base_url"] = url_input.rstrip("/")
                st.success("Saved!")
        with col_reset:
            if st.button("↩ Reset", use_container_width=True):
                st.session_state["base_url"] = DEFAULT_URL
                st.rerun()

        # Test connection button
        if st.button("🔌 Test Connection", use_container_width=True):
            test_url = st.session_state["base_url"]
            try:
                r = requests.get(test_url, timeout=3, allow_redirects=False)
                st.success(f"✅ Connected! Status {r.status_code}")
            except requests.exceptions.ConnectionError:
                st.error("❌ Cannot reach the server.")
            except requests.exceptions.Timeout:
                st.error("❌ Connection timed out.")
            except Exception as e:
                st.error(f"❌ {str(e)[:60]}")

        st.markdown(
            f"<div style='font-size:0.72rem; color:#94a3b8; margin-top:6px; word-break:break-all;'>"
            f"Active: {st.session_state['base_url']}</div>",
            unsafe_allow_html=True,
        )

    st.markdown("<div style='margin-top:10px'></div>", unsafe_allow_html=True)

    online = server_online()
    dot_color = "#22c55e" if online else "#ef4444"
    status_label = "Backend Online" if online else "Backend Offline"
    st.markdown(f"""
        <div style='background:rgba(255,255,255,0.07); border-radius:9px;
                    padding:10px 14px; margin-bottom:20px; display:flex; align-items:center;'>
            <span class='status-dot' style='background:{dot_color};'></span>
            <span style='font-size:0.82rem;'>{status_label}</span>
        </div>
    """, unsafe_allow_html=True)

    page = st.radio(
        "nav",
        ["📊  Dashboard", "📅  Schedule Appointment", "❌  Cancel Appointment", "📋  View Appointments"],
        label_visibility="collapsed",
    )

    st.divider()
    st.markdown("""
        <div style='text-align:center; color:#475569; font-size:0.72rem; padding-top:6px;'>
            v1.0 &nbsp;·&nbsp; MediBook Pro<br>
            <span style='color:#334155;'>© 2026 All rights reserved</span>
        </div>
    """, unsafe_allow_html=True)


# ── Dashboard ─────────────────────────────────────────────────────────────────
if page == "📊  Dashboard":
    st.markdown('<div class="page-title">Dashboard</div>', unsafe_allow_html=True)
    st.markdown(
        f'<div class="page-sub">Welcome back — overview for today, '
        f'{datetime.date.today().strftime("%B %d, %Y")}</div>',
        unsafe_allow_html=True,
    )

    today = datetime.date.today()
    appointments, status = api_list(today)
    total = len(appointments) if status == 200 else 0
    next_apt = appointments[0] if (status == 200 and appointments) else None

    # ── Metric row ──
    c1, c2, c3 = st.columns(3)
    with c1:
        st.markdown(f"""
        <div class="metric-card" style="border-left-color:#3b82f6;">
            <div class="metric-label">Today's Appointments</div>
            <div class="metric-value">{total}</div>
            <div class="metric-sub">📅 {today.strftime("%B %d, %Y")}</div>
        </div>""", unsafe_allow_html=True)

    with c2:
        next_time = (
            datetime.datetime.fromisoformat(next_apt["start_time"]).strftime("%I:%M %p")
            if next_apt else "—"
        )
        st.markdown(f"""
        <div class="metric-card" style="border-left-color:#8b5cf6;">
            <div class="metric-label">Next Appointment</div>
            <div class="metric-value" style="font-size:1.6rem;">{next_time}</div>
            <div class="metric-sub">⏰ Coming up next</div>
        </div>""", unsafe_allow_html=True)

    with c3:
        next_patient = next_apt["patient_name"].title() if next_apt else "—"
        st.markdown(f"""
        <div class="metric-card" style="border-left-color:#10b981;">
            <div class="metric-label">Next Patient</div>
            <div class="metric-value" style="font-size:1.4rem;">{next_patient}</div>
            <div class="metric-sub">👤 Ready to receive</div>
        </div>""", unsafe_allow_html=True)

    st.markdown("<br>", unsafe_allow_html=True)
    st.markdown("#### 🗓️ Today's Full Schedule")
    st.markdown('<hr class="section-divider">', unsafe_allow_html=True)

    if status == 200 and appointments:
        df = pd.DataFrame(appointments)
        df["Time"] = pd.to_datetime(df["start_time"]).dt.strftime("%I:%M %p")
        df["Booked On"] = pd.to_datetime(df["created_at"]).dt.strftime("%b %d, %Y")
        df["Status"] = df["canceled"].map({False: "✅ Confirmed", True: "❌ Canceled"})
        df = df.rename(columns={"patient_name": "Patient Name", "reason": "Reason", "id": "ID"})
        df = df[["ID", "Time", "Patient Name", "Reason", "Status", "Booked On"]]
        st.dataframe(df, use_container_width=True, hide_index=True)
    elif status == 200:
        st.markdown(
            '<div class="info-banner">📭 No appointments scheduled for today. '
            'Use <b>Schedule Appointment</b> to add one.</div>',
            unsafe_allow_html=True,
        )
    else:
        st.error("⚠️ Could not reach the backend server. Please ensure it is running.")


# ── Schedule Appointment ──────────────────────────────────────────────────────
elif page == "📅  Schedule Appointment":
    st.markdown('<div class="page-title">Schedule Appointment</div>', unsafe_allow_html=True)
    st.markdown('<div class="page-sub">Fill in the details below to book a new appointment</div>', unsafe_allow_html=True)

    with st.form("schedule_form", clear_on_submit=True):
        st.markdown("**Patient Information**")
        col1, col2 = st.columns(2)
        with col1:
            patient_name = st.text_input("Patient Full Name *", placeholder="e.g. John Smith")
            appt_date = st.date_input("Appointment Date *", min_value=datetime.date(2020, 1, 1))
        with col2:
            reason = st.text_input("Reason for Visit *", placeholder="e.g. General checkup, Follow-up")
            appt_time = st.time_input(
                "Appointment Time *",
                value=datetime.time(9, 0),
                step=1800,
            )

        st.markdown("<br>", unsafe_allow_html=True)
        submitted = st.form_submit_button("📅 Book Appointment")

    if submitted:
        if not patient_name.strip():
            st.error("Please enter the patient's full name.")
        elif not reason.strip():
            st.error("Please enter the reason for visit.")
        else:
            start_dt = datetime.datetime.combine(appt_date, appt_time)
            with st.spinner("Booking appointment..."):
                result, status = api_schedule(patient_name.strip(), reason.strip(), start_dt)

            if status == 200:
                st.success(
                    f"✅ Appointment booked for **{patient_name.strip().title()}** on "
                    f"**{appt_date.strftime('%B %d, %Y')}** at **{appt_time.strftime('%I:%M %p')}**."
                )
                st.balloons()
            else:
                st.error(f"❌ Booking failed: {result.get('detail', 'Unknown error')}")


# ── Cancel Appointment ────────────────────────────────────────────────────────
elif page == "❌  Cancel Appointment":
    st.markdown('<div class="page-title">Cancel Appointment</div>', unsafe_allow_html=True)
    st.markdown('<div class="page-sub">Enter the patient name and date to cancel their appointment</div>', unsafe_allow_html=True)

    st.markdown(
        '<div class="warn-banner">⚠️ This action will cancel <b>all</b> active appointments for '
        'the patient on the selected date.</div>',
        unsafe_allow_html=True,
    )
    st.markdown("<br>", unsafe_allow_html=True)

    with st.form("cancel_form", clear_on_submit=True):
        col1, col2 = st.columns(2)
        with col1:
            patient_name = st.text_input("Patient Full Name *", placeholder="e.g. John Smith")
        with col2:
            appt_date = st.date_input("Appointment Date *")

        st.markdown("<br>", unsafe_allow_html=True)
        submitted = st.form_submit_button("❌ Cancel Appointment")

    if submitted:
        if not patient_name.strip():
            st.error("Please enter the patient's full name.")
        else:
            cancel_dt = datetime.datetime.combine(appt_date, datetime.time.min)
            with st.spinner("Canceling appointment..."):
                result, status = api_cancel(patient_name.strip(), cancel_dt)

            if status == 200:
                count = result.get("canceled_count", 0)
                st.success(
                    f"✅ Successfully canceled **{count}** appointment(s) for "
                    f"**{patient_name.strip().title()}** on **{appt_date.strftime('%B %d, %Y')}**."
                )
            elif status == 404:
                st.warning(
                    f"⚠️ No active appointment found for **{patient_name.strip().title()}** "
                    f"on **{appt_date.strftime('%B %d, %Y')}**."
                )
            else:
                st.error(f"❌ Cancellation failed: {result.get('detail', 'Unknown error')}")


# ── View Appointments ─────────────────────────────────────────────────────────
elif page == "📋  View Appointments":
    st.markdown('<div class="page-title">View Appointments</div>', unsafe_allow_html=True)
    st.markdown('<div class="page-sub">Browse all scheduled appointments by date</div>', unsafe_allow_html=True)

    selected_date = st.date_input("Select a Date", value=datetime.date.today())

    with st.spinner("Loading appointments..."):
        appointments, status = api_list(selected_date)

    if status == 200:
        if appointments:
            st.markdown(
                f"**{len(appointments)} appointment(s) found for "
                f"{selected_date.strftime('%B %d, %Y')}**"
            )
            st.markdown('<hr class="section-divider">', unsafe_allow_html=True)

            df = pd.DataFrame(appointments)
            df["Time"] = pd.to_datetime(df["start_time"]).dt.strftime("%I:%M %p")
            df["Booked On"] = pd.to_datetime(df["created_at"]).dt.strftime("%b %d, %Y")
            df["Status"] = df["canceled"].map({False: "✅ Confirmed", True: "❌ Canceled"})
            df = df.rename(columns={
                "id": "ID",
                "patient_name": "Patient Name",
                "reason": "Reason",
            })
            df = df[["ID", "Time", "Patient Name", "Reason", "Status", "Booked On"]]

            st.dataframe(df, use_container_width=True, hide_index=True)

            csv = df.to_csv(index=False).encode("utf-8")
            st.download_button(
                label="⬇️ Export as CSV",
                data=csv,
                file_name=f"appointments_{selected_date}.csv",
                mime="text/csv",
            )
        else:
            st.markdown(
                f'<div class="info-banner">📭 No appointments found for '
                f'<b>{selected_date.strftime("%B %d, %Y")}</b>. '
                f'Try a different date or schedule a new appointment.</div>',
                unsafe_allow_html=True,
            )
    else:
        st.error("⚠️ Could not reach the backend server. Please ensure it is running on port 4444.")
