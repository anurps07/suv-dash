# SUVIDHA – Smart Urban Digital Helpdesk Assistant

SUVIDHA is a Smart Urban Digital Helpdesk Assistant designed as a public-facing, touch-based kiosk and web interface to improve citizen–government interactions in urban utility offices.

## Project Structure

This repository uses npm workspaces to manage both the frontend and backend in a unified monorepo:

- **`frontend/`**: The React/Vite application (User Interface).
- **`backend/`**: The Node.js Express server (API & Static File serving).

## Prerequisites

- Node.js (v18 or higher recommended)
- npm

## Installation

From the root of the project, install dependencies for both the frontend and backend simultaneously:
```bash
npm install
```

## Running the Application

There are two primary ways to run this application: **Development Mode** (with hot-reloading) and **Unified / Production Mode** (single application).

### 1. Unified Mode (Production-like)

In this mode, the frontend is built into static files, and the Express backend serves those frontend files on a single port (running as a single full-stack application).

**Step A:** Build the frontend  
```bash
npm run build
```
*(This bundles the React application into the `frontend/dist` directory).*

**Step B:** Start the unified server  
```bash
npm start
```
*(This starts the Node.js backend. It will serve the API routes on `/api` and serve the built React frontend on all other routes).*

**Access the Application:** Open your browser and navigate to [http://localhost:5000/](http://localhost:5000/).

---

### 2. Development Mode

During active development, it's highly recommended to run the servers in dev mode. This enables Hot-Module Replacement (HMR) for the React frontend, meaning the page updates instantly as you change code.

**Start the Dev Servers:**
```bash
npm run dev
```
*(This command uses `concurrently` to run both the Vite dev server and the Express backend server (via nodemon) simultaneously).*

**Access the Application:**
- **Frontend URL:** [http://localhost:8080/](http://localhost:8080/)
- **Backend API URL:** [http://localhost:5000/](http://localhost:5000/)

## Features & Technology Stack

**Frontend** (React + Vite + Tailwind CSS)
- Touch-based Kiosk User Interface
- Multilingual Support
- Responsive Design

**Backend** (Node.js + Express)
- API Services for handling citizen requests and forms
- Static file server for unified deployment

---

For more detailed information regarding the frontend configuration, please see the `frontend/README.md`.
