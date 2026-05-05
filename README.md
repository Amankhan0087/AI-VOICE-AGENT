# 🏥 AI Voice Agent — Appointment Management System

An intelligent appointment management system powered by a **VAPI AI Voice Agent**, with a **FastAPI** backend and a **Streamlit** dashboard for real-time scheduling, cancellation, and viewing of patient appointments.

---

## 📌 Overview

This project enables patients to book, cancel, and check appointments through a **voice AI agent** (VAPI). All appointment data is persisted in a SQLite database via a REST API backend. A professional Streamlit dashboard is included for clinic staff to monitor and manage appointments visually.

---

## 🏗️ Architecture

```
┌─────────────────┐        ┌──────────────────────┐        ┌─────────────┐
│   VAPI Voice    │──────▶ │   FastAPI Backend     │──────▶ │  SQLite DB  │
│     Agent       │  HTTP  │  (REST API, port 4444)│        │             │
└─────────────────┘        └──────────────────────┘        └─────────────┘
                                      ▲
                                      │ HTTP
                            ┌─────────────────────┐
                            │  Streamlit Dashboard │
                            │     (port 8501)      │
                            └─────────────────────┘
```

---

## ✨ Features

- 🎙️ **Voice AI Integration** — VAPI agent handles natural language appointment booking
- 📅 **Schedule Appointments** — Book patient appointments with name, reason, date & time
- ❌ **Cancel Appointments** — Cancel by patient name and date
- 📋 **View Appointments** — Browse appointments by date with export to CSV
- 📊 **Dashboard** — Real-time overview of today's schedule, next patient, and upcoming time
- 🟢 **Live Server Status** — Backend health indicator in the dashboard sidebar

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Voice Agent | [VAPI](https://vapi.ai) |
| Backend | FastAPI + Uvicorn |
| Database | SQLite + SQLAlchemy ORM |
| Frontend | Streamlit |
| Data Validation | Pydantic v2 |
| Package Manager | [uv](https://github.com/astral-sh/uv) |

---

## 📁 Project Structure

```
vapi_voice_agent/
├── backend.py        # FastAPI REST API (all endpoints)
├── dashboard.py      # Streamlit frontend dashboard
├── database.py       # SQLAlchemy models & DB setup
├── pyproject.toml    # Project dependencies
└── uv.lock           # Locked dependency versions
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.13+
- [uv](https://github.com/astral-sh/uv) package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/Amankhan0087/AI-VOICE-AGENT.git
cd AI-VOICE-AGENT

# Install dependencies
uv sync
```

### Running the App

Open **two terminals**:

**Terminal 1 — Start the Backend:**
```bash
uv run python backend.py
```
Backend runs at: `http://127.0.0.1:4444`
API docs at: `http://127.0.0.1:4444/docs`

**Terminal 2 — Start the Dashboard:**
```bash
uv run streamlit run dashboard.py --server.headless true
```
Dashboard runs at: `http://localhost:8501`

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/schedule_appointment/` | Book a new appointment |
| `POST` | `/cancel_appointment/` | Cancel an existing appointment |
| `GET` | `/list_appointments/` | List appointments for a date |

### Example — Schedule Appointment

```bash
curl -X POST http://127.0.0.1:4444/schedule_appointment/ \
  -H "Content-Type: application/json" \
  -d '{
    "patient_name": "John Smith",
    "reason": "General checkup",
    "start_time": "2026-05-05T10:00:00"
  }'
```

### Example — List Appointments

```bash
curl "http://127.0.0.1:4444/list_appointments/?date=2026-05-05"
```

---

## 🖥️ Dashboard Preview

| Page | Description |
|------|-------------|
| 📊 Dashboard | Today's metrics, next patient, full day schedule |
| 📅 Schedule Appointment | Book a new appointment via form |
| ❌ Cancel Appointment | Cancel by patient name & date |
| 📋 View Appointments | Browse by date, export as CSV |

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Author

**Aman Khan**
- GitHub: [@Amankhan0087](https://github.com/Amankhan0087)
