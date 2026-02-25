# HRMS Lite – Frontend

Live Demo:  
https://hrms-lite-frontend-teal.vercel.app/

Backend Repository:  
https://github.com/karan-singhh/hrms-lite

Backend API (Render):  
https://hrms-lite-mrcj.onrender.com/docs


---

## Overview

This is the frontend for HRMS Lite, a lightweight Human Resource Management System. It provides a simple interface to manage employees and track attendance.

The frontend is built using React (Vite) and communicates with a FastAPI backend via REST APIs.

Features:

- View employee list
- Add new employees
- Record attendance
- View attendance records
- Fully integrated with backend API
- Production deployment on Vercel


---

## Tech Stack

- React (Vite)
- JavaScript (ES6+)
- Fetch API
- CSS
- Vercel (deployment)


---

## Architecture
Browser -> React Frontend (Vercel) -> FastAPI Backend (Render)-> MongoDB Atlas



---

## Running Locally

## 1. Clone repository

```bash
git clone https://github.com/karan-singhh/hrms-lite-frontend.git
cd hrms-lite-frontend 
```


### 2. Install Dependencies
npm 

### 3. Create environment file

Create .env in project root:
```
VITE_API_BASE_URL=http://127.0.0.1:8000 
```

### 4. Start Dev Server
``` npm run dev ```

Frontend will run at- 
http://localhost:5173

### Environment Variables-
## For Production-
VITE_API_BASE_URL=https://hrms-lite-mrcj.onrender.com

### Deployment

Hosted on Vercel:
https://hrms-lite-frontend-teal.vercel.app/


### Notes

Frontend communicates with backend via REST APIs
Environment variables are injected at build time
Designed as a lightweight demo and portfolio project

### Related Repository

Backend:
https://github.com/karan-singhh/hrms-lite

