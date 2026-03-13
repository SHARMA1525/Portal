# Assignment Workflow Portal

A professional full-stack web application designed to manage assignments between teachers and students. The application features separate dashboards and role-based access control for a seamless educational workflow.

## Project Overview

The **Assignment Workflow Portal** is built using clean architecture and modern web development practices. It provides a structured environment where teachers can create, publish, and manage assignments, while students can view published assignments and submit their answers. 

This repository currently implements the complete Frontend interface. The Backend folder structure is prepared for future API implementation.

## Tech Stack

### Frontend
- **React.js** (v19) - UI Library
- **React Router** (v7) - Client-side routing
- **Context API & React Hooks** - State management
- **Axios** - API requests
- **TailwindCSS** (v4) - Utility-first styling
- **Vite** - Build tool and development server

### Backend (Prepared for Next Phase)
- **Node.js & Express.js**
- **MongoDB & Mongoose**
- **JWT Authentication**

## Project Structure

```text
assignment-workflow-portal/
├── frontend/                 # Fully implemented React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # React Context (Auth)
│   │   ├── hooks/            # Custom hooks
│   │   ├── pages/            # Route-level components
│   │   ├── routes/           # Routing configuration
│   │   ├── services/         # Axios API services
│   │   ├── utils/            # Helper functions
│   │   ├── App.jsx           # Main application wrapper
│   │   └── main.jsx          # React entry point
│   ├── package.json
│   └── vite.config.js
│
└── backend/                  # Placeholder folder structure 
    ├── src/
    │   ├── config/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── models/
    │   └── routes/
    ├── app.js
    ├── server.js
    └── package.json
```

## Features

### Authentication & Access Control
- Single login page for both teachers and students.
- Role-based redirection upon successful login.
- Protected routes to prevent unauthorized access to specific dashboards.
- Automatic logout on expired/invalid sessions.

### Teacher Dashboard
- Create new assignments with titles, descriptions, and due dates.
- Manage assignment status (Draft → Published → Completed).
- Filter assignments by their current status.
- View all student submissions for specific assignments.

### Student Dashboard
- View all currently published assignments.
- Submit a single, final text answer per assignment.
- See past submissions and assignment details.
- Overdue assignments and "Completed" assignments block new submissions.

## How to Run the Frontend

1. **Clone the repository and navigate to the frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View in Browser:**
   Open `http://localhost:5173` in your browser.

> **Note:** The API calls are currently directed to `/api` and will fail until the real Node.js backend is implemented. The UI logic is completely built and ready to receive real data.
