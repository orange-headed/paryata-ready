# Paryata Backend

Express and Prisma REST API for the Paryata frontend.

## Requirements

- Node.js 20+
- pnpm
- PostgreSQL 14+

## Install

From this directory:

```bash
pnpm install --ignore-workspace
```

## Configure PostgreSQL and environment variables

1. Create a PostgreSQL database named `paryata` (or choose another database name).
2. Copy `.env.example` to `.env`.
3. Set these variables in `.env`:

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string used by Prisma |
| `PORT` | No | API port, defaults to `5000` |
| `FRONTEND_URL` | No | Comma-separated allowed frontend origins, defaults to `http://localhost:3000` |
| `JWT_SECRET` | Later | Reserved for authentication; not used yet |
| `AI_API_KEY` | Later | Reserved for the backend AI integration; never sent to the frontend |
| `MAPS_API_KEY` | Later | Reserved for backend map integrations; never sent to the frontend |

## Prisma

Generate the client:

```bash
pnpm run prisma:generate
```

Create or update the local database without deleting existing data:

```bash
pnpm run prisma:migrate -- --name init
```

Open Prisma Studio:

```bash
pnpm run prisma:studio
```

## Start the backend

Development mode:

```bash
pnpm run dev
```

The API runs at `http://localhost:5000` by default.

## Endpoints

- `GET /api/health` returns the backend status.
- `POST /api/users` creates a user. Body: `{ "name": "...", "email": "..." }`.
- `GET /api/users/:id` reads a user by ID.

Responses use `{ "success": true, "data": ... }` for resource responses and `{ "success": false, "error": "..." }` for errors. Duplicate email addresses return `409`; invalid input returns `400`; missing users return `404`.

## Frontend connection

In the repository root, copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_API_URL` to the backend URL. The shared client in `lib/api.ts` uses that value for health and user requests. Private backend variables stay in `backend/.env` and are never prefixed with `NEXT_PUBLIC_`.