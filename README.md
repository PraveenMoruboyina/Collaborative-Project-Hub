# Collaborative Project Hub

A full-stack project collaboration platform that allows teams to create projects, manage members, assign tasks, and track progress.

## Features

### Authentication

* User Registration
* User Login
* JWT-based Authentication
* Protected Routes
* User Profile

### Project Management

* Create Projects
* View Owned and Joined Projects
* Project Dashboard
* View Project Details

### Team Collaboration

* Invite Members to Projects
* Accept Project Invitations
* Manage Project Members
* Role-based Membership

### Task Management

* Create Tasks
* Assign Tasks to Team Members
* Update Task Status
* Track Project Progress

### Dashboard

* Projects Owned
* Projects Joined
* Tasks Assigned
* Tasks Completed
* Pending Invitations

---

## Tech Stack

### Frontend

* React
* React Router
* Axios
* Tailwind CSS
* Vite

### Backend

* Node.js
* Express.js
* Prisma ORM
* JWT Authentication
* bcryptjs

### Database

* PostgreSQL

---

## Project Structure

```text
CPH
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── routes.jsx
│   │
│   └── package.json
│
├── backend
│   ├── prisma
│   │   └── schema.prisma
│   │
│   ├── src
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── routes
│   │   └── config
│   │
│   └── package.json
│
└── README.md
```

---

## Database Models

### User

* id
* name
* email
* password

### Project

* id
* name
* description

### ProjectMember

* userId
* projectId
* role

### Invitation

* email
* role
* status
* projectId

### Task

* title
* description
* status
* assigneeId
* projectId

---

## Environment Variables

### Backend

Create a `.env` file inside the backend directory.

```env
DATABASE_URL=postgresql://username:password@localhost:5432/cph
JWT_SECRET=your-secret-key
PORT=4000
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/<your-username>/Collaborative-Project-Hub.git

cd Collaborative-Project-Hub
```

---

### Backend Setup

```bash
cd backend

npm install
```

Create Prisma database:

```bash
npx prisma migrate dev
```

Start backend:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:4000
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Application Workflow

```text
User Registers
      ↓
User Logs In
      ↓
Create Project
      ↓
Invite Team Members
      ↓
Accept Invitation
      ↓
Create Tasks
      ↓
Assign Tasks
      ↓
Update Task Status
      ↓
Track Progress
```

---

## Authentication Flow

```text
Login
   ↓
JWT Generated
   ↓
Stored in Local Storage
   ↓
Axios Interceptor Attaches Token
   ↓
Backend Middleware Verifies Token
   ↓
Access Granted
```

---

## Future Enhancements

### V2 Roadmap

* Docker Support
* Docker Compose
* Kubernetes Deployment
* CI/CD Pipeline
* Notifications
* Comments on Tasks
* File Attachments
* Activity Timeline
* AI-powered Project Insights

---

## Learning Outcomes

This project demonstrates:

* React Fundamentals
* Routing and Navigation
* State Management
* REST API Development
* Authentication & Authorization
* Prisma ORM
* PostgreSQL Relationships
* Full Stack Development
* Project Architecture
* Team Collaboration Workflows

---

## Author

**Praveen Moruboyina**

Built as a full-stack learning project focused on modern web development, DevOps, and software engineering practices.
