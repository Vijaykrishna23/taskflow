# Taskflow Starter Project

## Overview
This project is a full-stack starter template with:
- **Backend:** FastAPI (Python)
- **Frontend:** React (Vite, TypeScript, styled-components)
- **Database:** PostgreSQL (via Docker)

## Structure
- `backend/` — FastAPI app
- `frontend/` — React app (Vite, TypeScript, styled-components)
- `docker-compose.yml` — Orchestrates backend, frontend, and Postgres

## Usage

### Prerequisites
- Docker & Docker Compose installed

### Quick Start
1. Build and start all services:
   ```sh
   docker-compose up --build
   ```
2. Access the apps:
   - Backend: [http://localhost:8000](http://localhost:8000)
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Postgres: localhost:5432 (user: postgres, password: postgres)

### Development
- Edit code in `backend/` or `frontend/` and restart the relevant service.

---

This is a minimal starter. Extend as needed for your project!
