# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interview Manager - A Next.js 14 application for managing job interview schedules with email reminders. Built with App Router, Prisma ORM, PostgreSQL, and Tailwind CSS.

## Common Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push     # Push Prisma schema to database
npm run db:generate # Generate Prisma client
npm run db:studio   # Open Prisma Studio
```

## Architecture

### Tech Stack
- **Framework**: Next.js 14.2.3 (App Router)
- **Database**: PostgreSQL (Supabase or local)
- **ORM**: Prisma 5.22
- **Email**: Resend API
- **Deployment**: Vercel (with Cron jobs for email reminders)

### Database Schema
- `Interview`: Stores interview records with fields like date, startTime, endTime, company, position, interviewType, meetingUrl, notes, reminderMinutes, reminderSent, reminderEnabled
- `Settings`: Stores user email for reminders

### Key API Routes
- `GET/POST /api/interviews` - List/create interviews
- `GET/PUT/DELETE /api/interviews/[id]` - Read/update/delete single interview
- `GET /api/interviews?token=xxx` - Get interview by shareToken
- `GET /api/cron/check-reminders` - Cron job endpoint (requires User-Agent: vercel-cron/1.0)
- `GET /api/settings` - Get/update user settings

### Prisma Client
Located at `src/lib/prisma.ts`. Uses global singleton pattern to prevent multiple instances in development.

### Email System
- Email sending via `src/lib/resend.ts` using Resend API
- Cron checks for interviews needing reminders every 10 minutes
- Reminder sent `reminderMinutes` before interview start time

### Deployment Notes
- `vercel.json` configures Cron to run every 10 minutes
- Production environment requires `DATABASE_URL`, `DIRECT_URL`, and `RESEND_API_KEY`
- Supabase connection string format: `postgresql://postgres.[ref]:[password]@aws-[region].pooler.supabase.com:6543/postgres?pgbouncer=true`

## Code Patterns

### Server Components
Pages use `export const dynamic = 'force-dynamic'` to prevent static generation when accessing database at build time.

### Date Handling
Prisma returns JavaScript Date objects from PostgreSQL. Always convert using `new Date(item.date)` before string operations like `.toISOString()`.

### Time Storage
startTime/endTime stored as strings (e.g., "14:30") rather than Time type, to avoid timezone issues. Date stored separately as `DateTime @db.Date`.

## Database Connection Issues
Common error: `Can't reach database server` or `prepared statement already exists`
- PgBouncer prepared statement issues: use `?pgbouncer=true` in connection string
- Connection pooler port: 6543 (not 5432) when using Supabase
