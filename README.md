# 🏙️ SUVIDHA – Smart Urban Digital Helpdesk Assistant

**SUVIDHA (Smart Urban Digital Helpdesk Assistant)** is a smart citizen-service platform that connects citizens with municipal departments through a simple, transparent, and trackable digital helpdesk.

Citizens can raise complaints, track tickets, monitor SLA progress, and provide feedback, while field officers can manage assigned complaints and update resolution status.

---

## 🚀 Key Features

- 🎫 **Complaint & Ticket Management**
- 🏢 **Municipal Department Selection**
- 🔎 **Ticket Tracking**
- ⏱️ **SLA Monitoring**
- 👨‍🔧 **Field Officer Dashboard**
- 🚨 **Priority & Escalation Management**
- 🌐 **Multilingual Support**
- 📱 **Responsive & Kiosk-Friendly UI**

### 🏢 Supported Departments

- ⚡ Electricity
- 🔥 Gas
- 💧 Water Supply
- 🗑️ Waste Management

---

## 👤 Citizen Dashboard

Citizens can:

- Raise new complaints
- Select departments and services
- Track ticket status
- View complaint history
- Monitor SLA progress
- View receipts
- Provide feedback

### 👨‍🔧 Field Officer Dashboard

Officers can:

- View assigned complaints
- Manage field workload
- Update ticket status
- Complete field work
- Resolve complaints
- Escalate blocked cases

---

## 🔄 Ticket Lifecycle

```text
OPEN
  ↓
ASSIGNED
  ↓
IN PROGRESS
  ↓
RESOLVED
  ↓
CLOSED
🔁 System Workflow
Citizen
   ↓
Open SUVIDHA
   ↓
Select Department
   ↓
Select Service
   ↓
Raise Complaint
   ↓
Ticket Created
   ↓
Field Officer Assigned
   ↓
Field Inspection
   ↓
Work In Progress
   ↓
Resolution
   ↓
Citizen Feedback
   ↓
CLOSED
🏗️ System Architecture
┌─────────────────┐
│     Citizen     │
└────────┬────────┘
         ↓
┌─────────────────┐
│ React Frontend  │
│ Vite + Tailwind │
└────────┬────────┘
         ↓ REST API
┌─────────────────┐
│ Node.js Express │
│     Backend     │
└────────┬────────┘
         ↓
┌─────────────────┐
│ Application     │
│ Logic / Data    │
└─────────────────┘
🛠️ Technology Stack

Frontend

React
Vite
Tailwind CSS
JavaScript

Backend

Node.js
Express.js
REST API

Tools

npm
Git
GitHub
Nodemon
📸 Screenshots
👤 Citizen Dashboard

🏢 Department Selection

🎫 My Service Complaints

👨‍🔧 Field Officer Dashboard

📁 Project Structure
SUVIDHA/
├── frontend/
├── backend/
├── screenshots/
│   ├── citizen-dashboard.png
│   ├── department-selection.png
│   ├── citizen-my-tickets.png
│   └── officer-dashboard.png
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
⚙️ Installation
1. Clone Repository
git clone https://github.com/anurps07/suv-dash.git
cd suv-dash
2. Install Dependencies
npm install
3. Run Development Server
npm run dev

Frontend:

http://localhost:8080

Backend:

http://localhost:5000

🖥️ Kiosk Mode

SUVIDHA is designed to support touchscreen kiosks in:

🏢 Municipal offices
🏙️ Smart city centers
🧾 Citizen service centers
💧 Public utility offices
🏛️ Government helpdesks
Touch Screen
     ↓
Welcome
     ↓
Department
     ↓
Service
     ↓
Complaint
     ↓
Ticket ID
     ↓
Receipt
🤖 Future AI Features

SUVIDHA can be enhanced with:

🤖 Smart complaint classification
💬 AI citizen assistant
🌐 Multilingual translation
🔍 Duplicate complaint detection
🚨 Priority recommendation
🧠 Smart department routing
📝 Complaint summarization
📊 Future Analytics

Future administrator dashboards can provide:

Complaints by department
SLA compliance
Average resolution time
Officer workload
Escalated complaints
Location-based complaint analytics
🔐 Security

Production deployment should include:

Authentication & authorization
Input validation
API security
Rate limiting
HTTPS
Secure environment variables
Database access controls

⚠️ Never upload passwords, API keys, or database credentials to GitHub.

🎯 Project Vision

SUVIDHA connects Citizens → Municipal Departments → Field Officers → Resolution → Citizen Feedback through one unified digital platform.

🌟 Making Urban Citizen Services Simple, Digital & Trackable.
