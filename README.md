🏙️ SUVIDHA – Smart Urban Digital Helpdesk Assistant

SUVIDHA (Smart Urban Digital Helpdesk Assistant) is a smart urban citizen helpdesk system designed to simplify communication between citizens and municipal/utility departments.

Citizens can raise complaints, track tickets, monitor resolution progress, and receive service updates. Field officers can manage assigned complaints, update work status, resolve tickets, and monitor SLA performance.

👤 Citizen Dashboard

The citizen dashboard provides a complete overview of submitted civic complaints.

Features:

Raise new ticket
Track ticket
View total submissions
View active complaints
View resolved complaints
View escalated complaints

🏢 Municipal Department Selection

Citizens select the appropriate department before raising a complaint.

Available departments include:

⚡ Electricity
🔥 Gas
💧 Water Supply
🗑️ Waste Management

Each department displays its applicable SLA.

🎫 My Service Complaints

Citizens can monitor all their submitted complaints from one place.

Information displayed includes:

Ticket ID
Complaint
Department
Priority
Status
Assigned officer
Submission date
SLA progress
Receipt

Example ticket workflow:

Open → Assigned → In Progress → Resolved

👨‍🔧 Field Officer Dashboard

The field officer dashboard allows municipal staff to manage field work.

Features:

Assigned workload
Field work in progress
Resolved tickets
Escalated complaints
Search work orders
Update ticket status
Complete field work

🔄 Complete System Workflow
                    CITIZEN
                       │
                       ▼
               Open SUVIDHA
                       │
                       ▼
             Select Department
                       │
                       ▼
               Select Service
                       │
                       ▼
               Raise Complaint
                       │
                       ▼
                Ticket Created
                       │
                       ▼
             Assign Field Officer
                       │
                       ▼
               Field Inspection
                       │
                       ▼
               Work In Progress
                       │
                       ▼
                  Resolution
                       │
                       ▼
              Citizen Feedback
                       │
                       ▼
                   CLOSED
👥 User Roles
👤 Citizen

Citizens can:

Raise complaints
Select municipal departments
Track tickets
View complaint history
Check SLA progress
View receipts
Provide feedback
👨‍🔧 Field Officer

Officers can:

View assigned tickets
Manage field workload
Update complaint status
Perform field work
Resolve complaints
Escalate blocked cases
🏢 Administrator

The future administrator module can provide:

Department management
Officer management
Complaint monitoring
SLA monitoring
Escalation management
Analytics and reports
⭐ Key Features
Feature	Description
🎫 Ticket Management	Create and manage citizen complaints
🔎 Ticket Tracking	Track complaints using Ticket ID
🏢 Departments	Electricity, Gas, Water, Waste Management
⏱️ SLA Tracking	Monitor response and resolution timelines
🚨 Priority	Normal, High and Emergency complaints
👨‍🔧 Officer Dashboard	Manage assigned field work
🌐 Multilingual	Support multiple languages
📱 Responsive	Desktop, tablet and kiosk friendly
🖥️ Kiosk	Designed for public touchscreen kiosks
🎫 Ticket Lifecycle
┌──────────┐
│   OPEN   │
└────┬─────┘
     ↓
┌──────────┐
│ ASSIGNED │
└────┬─────┘
     ↓
┌─────────────┐
│ IN PROGRESS │
└──────┬──────┘
       ↓
┌──────────┐
│ RESOLVED │
└────┬─────┘
     ↓
┌──────────┐
│  CLOSED  │
└──────────┘
🏗️ System Architecture
             ┌─────────────────┐
             │     Citizen     │
             └────────┬────────┘
                      │
                      ▼
             ┌─────────────────┐
             │ React Frontend  │
             │ Vite + Tailwind │
             └────────┬────────┘
                      │
                   REST API
                      │
                      ▼
             ┌─────────────────┐
             │ Node.js Express │
             │     Backend     │
             └────────┬────────┘
                      │
                      ▼
             ┌─────────────────┐
             │ Application     │
             │ Logic           │
             └────────┬────────┘
                      │
                      ▼
             ┌─────────────────┐
             │ Database / Data │
             │ Storage         │
             └─────────────────┘
🛠️ Technology Stack
Frontend
React
Vite
Tailwind CSS
JavaScript
HTML5/CSS3
Backend
Node.js
Express.js
REST API
JSON
Development
npm
npm Workspaces
Nodemon
Git/GitHub
📁 Project Structure
SUVIDHA/
│
├── frontend/
│
├── backend/
│
├── screenshots/
│   ├── citizen-dashboard.png
│   ├── department-selection.png
│   ├── citizen-my-tickets.png
│   └── officer-dashboard.png
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
🚀 Installation
1. Clone Repository
git clone <YOUR-GITHUB-REPOSITORY-URL>
2. Open Project
cd SUVIDHA
3. Install Dependencies
npm install
💻 Development Mode

Run:

npm run dev

Frontend:

http://localhost:8080/

Backend:

http://localhost:5000/

Development mode supports hot reloading, allowing changes to appear quickly during development.

🚀 Production Mode

Build the frontend:

npm run build

Then start the backend:

npm start

Open:

http://localhost:5000/

The Express server serves the React frontend and backend API together.

🔌 API Structure
Method	Endpoint	Purpose
GET	/api/departments	Get departments
GET	/api/services	Get services
POST	/api/tickets	Create ticket
GET	/api/tickets/:id	Get ticket
PUT	/api/tickets/:id	Update ticket
DELETE	/api/tickets/:id	Delete ticket

Example:

{
  "ticketId": "TKT-2026-001",
  "department": "Water Supply",
  "issue": "No water supply",
  "priority": "High",
  "status": "In Progress"
}
🖥️ Kiosk Mode

SUVIDHA can be deployed on touchscreen kiosks in:

Municipal offices
Citizen service centers
Smart city centers
Public utility offices
Government helpdesks

Typical kiosk workflow:

Touch Screen
     ↓
Welcome
     ↓
Language
     ↓
Department
     ↓
Service
     ↓
Complaint Form
     ↓
Submit
     ↓
Ticket ID
     ↓
Receipt
🤖 Future AI Features

SUVIDHA can be extended with AI capabilities such as:

Smart Complaint Classification
Citizen:
"There is a huge pothole near my house."

AI:
Department → Roads
Category → Road Damage
AI Chat Assistant

Citizens could simply type:

"I want to report water leakage."

The AI assistant can guide them through the required steps.

Other AI Features
Automatic complaint categorization
Multilingual translation
Duplicate complaint detection
Priority recommendation
Smart routing to departments
Complaint summarization
📊 Future Analytics Dashboard

Future administrators could monitor:

Total Complaints
       │
       ├── Pending
       ├── Assigned
       ├── In Progress
       ├── Resolved
       └── Escalated

Possible analytics:

Complaints by department
Complaints by location
Resolution time
SLA compliance
Officer workload
Escalated complaints
🔐 Security

Production deployment should include:

Input validation
Authentication
Authorization
API security
Rate limiting
HTTPS
Secure environment variables
Database access controls

Never upload passwords, API keys or database credentials to GitHub.

🎯 Project Vision

SUVIDHA connects citizens, municipal departments and field officers through one digital platform.

Citizen
   ↕
SUVIDHA
   ↕
Municipal Department
   ↕
Field Officer
   ↕
Resolution
   ↕
Citizen Feedback
SUVIDHA – Making Urban Citizen Services Simple, Digital and Trackable.
📸 GitHub Image Folder

Make sure your repository contains these four actual image files:

screenshots/
├── citizen-dashboard.png
├── department-selection.png
├── citizen-my-tickets.png
└── officer-dashboard.png
