#  Blog web Project

A full-stack blog application featuring a React-based frontend and a microservices architecture backend powered by Node.js and MongoDB. 

## Project Architecture

The project is divided into two primary directories:
- **`Front/`**: The client-side application built with React, Vite, and Tailwind CSS.
- **`api/`**: The server-side infrastructure using a microservices pattern, easily composable via Docker.

---

## 💻 Frontend (`Front/`)

The frontend is a single-page application built for speed and responsive design.

### Tech Stack
- **Framework:** React 19 (via Vite)
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v7
- **Icons:** Lucide React

### Running Locally
1. Navigate to the frontend directory:
   ```bash
   cd Front
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🔌 Backend Microservices (`api/`)

The backend is composed of multiple distinct services that run independently and communicate through an API Gateway.

### Services Overview
- **API Gateway** (`:5000`): The central entry point for all frontend requests. Routes traffic to the underlying microservices.
- **Auth Service** (`:5001`): Handles user authentication and authorization logic.
- **Blog Service** (`:5002`): Manages blog post creation, retrieval, updating, and deletion.
- **MongoDB** (`:27017`): The NoSQL database used for persistent storage.

### Running Locally with Docker

The easiest way to orchestrate and run the entire backend is via Docker Compose.

1. Ensure you have Docker and Docker Compose installed.
2. Navigate to the API directory:
   ```bash
   cd api
   ```
3. Boot up the network, databases, and services:
   ```bash
   docker-compose up -d --build
   ```

Once started, the backend API will be accessible at `http://localhost:5000`. You can stop the services at any time by running `docker-compose down`.
