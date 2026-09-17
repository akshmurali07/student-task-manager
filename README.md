# Student Task Manager

A full-stack Student Task Management Application built for the Lunorsoft Full Stack Developer assignment.

## Overview

Student Task Manager helps students organize and track their academic tasks in one place. Users can create, edit, delete, complete, and filter tasks while keeping their task data stored in a database.

## Features

- User registration and login
- Secure session-based authentication
- Create tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed
- View all, pending, and completed tasks
- Task priority levels
- Due dates
- Optional task descriptions
- Dashboard with task statistics
- Responsive and modern UI
- Persistent database storage

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- Next.js API Routes
- Node.js
- REST-style API endpoints

### Database
- MongoDB
- Mongoose

### Authentication
- JWT
- HTTP-only cookies
- jose

## Project Structure

```text
student-task-manager/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   └── tasks/
│   ├── dashboard/
│   ├── login/
│   ├── register/
│   └── tasks/
├── lib/
│   ├── Task.js
│   ├── User.js
│   ├── auth.js
│   └── mongodb.js
├── public/
├── package.json
└── README.md
```

## Main API Routes

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/session
```

### Tasks

```text
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/akshmurali07/student-task-manager.git
cd student-task-manager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
AUTH_SECRET=your_auth_secret
```

Do not commit `.env.local` to GitHub.

### 4. Run the development server

```bash
npm run dev
```

Open the application at:

```text
http://localhost:3000
```

## Application Flow

```text
Landing Page
     ↓
Login / Register
     ↓
Authentication
     ↓
Dashboard
     ↓
Create / Edit / Complete / Delete Tasks
     ↓
MongoDB
```

## Architecture

The application uses a Next.js full-stack architecture.

- React and Next.js are used for the frontend.
- Next.js API routes handle backend operations.
- MongoDB stores users and task data.
- Mongoose manages database models and queries.
- Authentication is handled using JWT-based sessions stored in HTTP-only cookies.

## Testing

The following functionality was tested locally:

- User registration
- User login
- Authentication protection for the dashboard
- Logout
- Creating tasks
- Editing tasks
- Deleting tasks
- Marking tasks as completed
- Filtering pending and completed tasks
- Dashboard task statistics

## AI Tools Disclosure

ChatGPT was used during development for debugging assistance, implementation guidance, code suggestions, and troubleshooting.

The generated suggestions were reviewed, integrated, tested, and modified as part of the project development process.

## Future Improvements

- Task search
- Additional task sorting options
- Dashboard analytics
- Improved form validation
- Deployment and production monitoring

## Author

**Akshara Murali**

GitHub: [akshmurali07](https://github.com/akshmurali07)