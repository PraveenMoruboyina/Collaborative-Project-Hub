# Collaborative Project Hub (CPH)

## Why This Project Exists

Collaborative Project Hub (CPH) was not built to create the most feature-rich project management platform.

The primary goal of this project was to understand how a modern application moves from development to production.

Many student projects stop after implementing features and are deployed using managed platforms such as Vercel, Netlify, or Render. While these platforms simplify deployment, they abstract away many of the operational challenges involved in running real-world systems.

I wanted to gain practical experience with the complete software delivery lifecycle:

* Designing a full-stack application
* Building backend APIs and database models
* Containerizing applications using Docker
* Managing multi-container environments
* Deploying workloads on Kubernetes
* Configuring networking using Services and Ingress
* Managing persistent database storage
* Handling application secrets securely
* Debugging production-like deployment issues

To keep the focus on infrastructure and deployment concepts, I intentionally chose a relatively simple product domain: project collaboration and task management.

The result is a working end-to-end application that demonstrates both software development and modern deployment practices.


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

### Infrastructure & DevOps
- Docker
- Docker Compose
- Kubernetes
- NGINX Ingress Controller
- Persistent Volumes (PV)
- Persistent Volume Claims (PVC)
- Kubernetes Secrets
- Docker Hub

---

## Project Structure

```text
CPH
│
├── backend
│   ├── prisma
│   │   └── schema.prisma
│   │
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
│
├── frontend
│   ├── public
│   │
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── pages
│   │   ├── services
│   │   ├── styles
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── routes.jsx
│   │
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── vite.config.js
│   └── package.json
│
├── infrastructure
│   ├── docker
│   │   └── docker-compose.yml
│   │
│   └── kubernetes
│       ├── deployments
│       │   ├── backend-deployment.yml
│       │   ├── frontend-deployment.yml
│       │   └── db-deployment.yml
│       │
│       ├── services
│       │   ├── backend-service.yml
│       │   ├── frontend-service.yml
│       │   └── db-service.yml
│       │
│       ├── ingress
│       │   └── ingress.yml
│       │
│       ├── storage
│       │   └── postgres-pvc.yml
│       │
│       ├── secrets
│       │   ├── backend-secret-example.yml
│       │   └── postgres-secret-example.yml
│       │
│       └── configmaps
│
├── docs
│
├── .github
│
├── LICENSE
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

### Kubernetes Deployment

CPH can be deployed on a Kubernetes cluster using the provided manifests.

Components Deployed
Frontend Deployment
Backend Deployment
PostgreSQL Deployment
Frontend Service
Backend Service
Database Service
Persistent Volume Claim (PVC)
Kubernetes Secrets
Ingress Resource

### Apply Kubernetes Resources
```bash
kubectl apply -f infrastructure/
```
### Verify Deployment
```bash
kubectl get pods
kubectl get svc
kubectl get ingress
kubectl get pvc
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

* AWS Deployment
* CI/CD Pipeline
* Notifications
* Comments on Tasks
* File Attachments
* Activity Timeline
* AI-powered Project Insights

---

## Learning Outcomes

This project demonstrates:

* Full Stack Application Development
* REST API Design and Development
* Authentication and Authorization using JWT
* Database Modeling with PostgreSQL and Prisma ORM
* Frontend Development with React
* Containerization using Docker
* Multi-container Development with Docker Compose
* Kubernetes Deployments and Service Networking
* Ingress-based Application Routing
* Persistent Storage Management in Kubernetes
* Secret Management for Application Configuration
* End-to-End Deployment Workflow from Development to Production
* Troubleshooting and Debugging Across Application, Database, and Infrastructure Layers

---

## Author

**Praveen Moruboyina**

CPH was built to gain practical experience in developing, containerizing, deploying, and managing a full-stack application using modern tools such as Docker, Kubernetes, PostgreSQL, and Prisma. The goal was not to build the most feature-rich application, but to understand how real-world applications move from development to production.