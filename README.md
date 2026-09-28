# SUVIDHA – Smart Urban Digital Helpdesk Assistant

SUVIDHA is a Smart Urban Digital Helpdesk Assistant designed as a public-facing,
touch-based kiosk and web interface to improve citizen–government interactions
in urban utility offices.

## Project Structure

This repository contains both the frontend and backend components for the project.

- **`frontend/`**: Contains the React/Vite application.
- **`backend/`**: Contains the Node.js Express server.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm

## How to Run

1. **Install dependencies for both frontend and backend:**
   From the root of the project, run:
   ```bash
   npm install
   ```

2. **Start the development servers:**
   From the root of the project, run:
   ```bash
   npm run dev
   ```
   This will use `concurrently` to start both the frontend Vite server and the backend Express server simultaneously.

## Features & Technology Stack

**Frontend** (React + Vite + Tailwind CSS)
- Touch-based Kiosk User Interface
- Multilingual Support
- Responsive Design

**Backend** (Node.js + Express)
- API Services for handling citizen requests and forms

---

For more detailed information on the frontend, check `frontend/README.md`.
