# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Monorepo with Next.js frontend and FastAPI backend. Portfolio website with admin panel.

## Common Commands

### Client (Next.js)
```bash
cd client
npm run dev      # Dev server at localhost:3000
npm run build   # Production build
npm run lint    # ESLint
npm test        # Run vitest tests
npm run test:ui # Vitest with UI
```

### Server (FastAPI)
```bash
cd server
python main.py   # Runs uvicorn on localhost:8000
# API docs at /api/docs, ReDoc at /api/redoc
```

## Architecture

### Client
- Next.js 16 (App Router), React 19, TypeScript
- Redux Toolkit for state management
- TailwindCSS for styling
- Zod for validation
- Services layer for API calls

### Server
Clean Architecture with layers:
- `app/api/v1/endpoints/` — HTTP endpoints
- `app/services/` — Business logic
- `app/repositories/` — Data access (Repository Pattern)
- `app/domain/` — Generic repository interface
- `app/db/models/` — SQLAlchemy models
- `app/db/schemas/` — Pydantic DTOs

### API Communication
Client uses iron-session for auth, proxies requests to server via `client/proxy.ts`.

## Key Files
- `client/proxy.ts` — API proxy configuration
- `client/app/api/` — Next.js API routes (auth, proxy)
- `server/app/core/dependencies.py` — Dependency injection factories
- `server/app/db/models/` — Database models (users, projects, skills, etc.)