# Mentio

A real-time interactive quiz platform designed for live mentor–mentee sessions.

Mentio is built with a Turborepo architecture consisting of two separate Next.js frontends (mentor and participant) and a Node.js + Express backend with PostgreSQL. The system is structured to support live session-based quizzes with scalable real-time extensions.

---

## Architecture

Monorepo using Turborepo:

- `mentor-app` – Host dashboard for creating and managing quizzes  
- `mentee-app` – Participant interface for joining sessions and submitting answers  
- `backend` – Node.js + Express API server  
- `database` – PostgreSQL  

Communication currently happens via REST APIs. The architecture is structured to support future real-time upgrades (e.g., WebSockets).

---

## Current Features (WIP)

- Multiple choice quiz creation  
- Session-based quiz joining  
- Mentor and participant separation  
- Express-based authentication  
- PostgreSQL-backed session storage  
- Turborepo-based monorepo structure  

---

## Tech Stack

Frontend:
- Next.js
- TypeScript
- Turborepo

Backend:
- Node.js
- Express

Database:
- PostgreSQL

Authentication:
- Express-based authentication middleware

---

## System Design Intent

Mentio is being designed as a scalable live quiz platform with:

- Session-based architecture
- Clear separation of roles (mentor vs participant)
- Centralized backend validation
- Extensible real-time communication layer (planned)

---

## Planned Improvements

- Real-time result broadcasting (WebSockets)
- Live result visualization
- Vote validation and anti-duplicate protection
- Session analytics
- Deployment and production hardening
- Rate limiting and concurrency handling

---

## Status

This project is currently under active development.
