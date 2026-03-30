# CONTEXT.md — Altus Hub

> This document provides a comprehensive overview of the Altus Hub project for onboarding, continuity, and future development reference.

## Project Overview

**Altus Hub** is a full-stack member portal and digital hub for **Altus Collective** (formerly Altus Forum), a professional peer-group organization. The platform serves as the central hub for member engagement, strategy sessions, CRM management, and community features.

- **Live domains:** [altuscollective.us](https://altuscollective.us), [sparkstrategiesgroup.com](https://sparkstrategiesgroup.com)
- **Vercel project name:** `sparkos`
- **GitHub repo (public, production):** [sparkstrategiesgroup/altus-hub](https://github.com/sparkstrategiesgroup/altus-hub)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Auth | NextAuth v5 (beta) with Prisma adapter |
| ORM | Prisma 7.5 with PostgreSQL |
| Database | Supabase PostgreSQL (project: `hfqbqfawxfgbbduvuupp`, region: `us-west-2`) |
| Hosting | Vercel (Turbopack bundler, Node.js 24.x) |
| UI Libraries | Framer Motion, Lucide React, Recharts, Sonner |
| Email | Nodemailer |
| PDF Export | html2pdf.js |
| CSV Parsing | PapaParse |

## Application Architecture

The app uses Next.js App Router with three route groups:

### `(marketing)` — Public-facing pages
- `/` — Landing page
- `/about` — About Altus Collective
- `/contact` — Contact form (submissions stored in `ContactSubmission` table)
- `/how-it-works` — Membership explanation
- `/principals` — Principal directory with dynamic `[slug]` pages

### `(auth)` — Authentication
- `/login` — Email/password login via NextAuth
- `/register` — New member registration

### `(portal)` — Authenticated member area
- `/dashboard` — Member dashboard
- `/accounts` — CRM: ISSA member accounts with detail pages (`[id]`)
- `/admin` — Admin portal (nav editor, content manager, email campaigns, site settings)
- `/altus-digital` — CSV upload and bulk email tool
- `/altusacademy/bsc-strategy` — BSC Strategy Masterclass (interactive session with timer, Q&A, PDF export)
- `/discussions` — Community discussions with comments
- `/email-editor` — Email campaign editor
- `/events` — Events listing with RSVP
- `/masterclass` — Masterclass landing page
- `/messages` — Direct messaging between members
- `/peer-groups` — Peer group management with detail pages
- `/profile` — Member profile management
- `/resources` — Shared resource library
- `/sessions` — Strategy sessions with BSC strategy sub-route

## API Routes

| Endpoint | Purpose |
|---|---|
| `/api/auth/[...nextauth]` | NextAuth authentication handler |
| `/api/auth/register` | New user registration |
| `/api/admin/email-campaigns` | Email campaign management |
| `/api/admin/nav-items` | Sidebar navigation editor |
| `/api/admin/page-content` | CMS page content |
| `/api/admin/site-config` | Site configuration |
| `/api/altusacademy/bsc-strategy/questions` | Q&A for BSC strategy sessions |
| `/api/bulk-email` | Bulk email sending |
| `/api/contact` | Contact form submissions |
| `/api/csv-email` | CSV-based email campaigns |
| `/api/csv-upload` | CSV data import |
| `/api/discussions` | Discussion CRUD |
| `/api/events/[id]/rsvp` | Event RSVP |
| `/api/messages` | Direct messaging |
| `/api/profile` | Profile updates |
| `/api/resources` | Resource management |
| `/api/sessions/[id]/rsvp` | Session RSVP |
| `/api/upload-image` | Image upload handler |

## Database Schema (Supabase PostgreSQL)

| Table | Rows | Purpose |
|---|---|---|
| `User` | 1 | Registered members with roles, company info |
| `Account` | 0 | OAuth/NextAuth accounts |
| `Session` | 0 | Auth sessions |
| `VerificationToken` | 0 | Email verification |
| `Principal` | 0 | Organization principals |
| `PeerGroup` | 0 | Peer group definitions |
| `PeerGroupMember` | 0 | Peer group memberships |
| `ForumSession` | 0 | Scheduled forum sessions |
| `Discussion` | 0 | Community discussions |
| `Comment` | 0 | Discussion comments (nested/threaded) |
| `Resource` | 0 | Shared files and resources |
| `Event` | 0 | Scheduled events |
| `EventRsvp` | 0 | Event attendance tracking |
| `Message` | 0 | Direct messages between members |
| `ContactSubmission` | 0 | Public contact form entries |
| `MemberAccount` | 343 | ISSA member CRM records |
| `MemberContact` | 0 | Contacts linked to member accounts |
| `SiteConfig` | 0 | Key-value site configuration |
| `NavItem` | 12 | Sidebar navigation items |
| `PageContent` | 0 | CMS-managed page content |
| `EmailCampaign` | 0 | Email campaign history |

## Key Components

- **`src/components/portal/portal-shell.tsx`** — Portal layout wrapper
- **`src/components/portal/sidebar.tsx`** — Navigation sidebar
- **`src/components/portal/topbar.tsx`** — Top navigation bar
- **`src/components/marketing/nav.tsx`** — Marketing site navigation
- **`src/components/marketing/footer.tsx`** — Marketing site footer
- **`src/components/ui/`** — Shared UI primitives (avatar, badge, button, card, input)
- **`src/auth.ts`** — NextAuth configuration
- **`src/lib/prisma.ts`** — Shared Prisma client (uses `DIRECT_URL` to avoid pgbouncer issues)
- **`src/lib/validators.ts`** — Zod validation schemas
- **`src/proxy.ts`** — Middleware/proxy (renamed from `middleware.ts` per Next.js 16 migration)

## Environment Variables Required

The following environment variables are expected in production (Vercel):

- `DATABASE_URL` — Supabase PostgreSQL connection string (pooled, via pgbouncer)
- `DIRECT_URL` — Supabase PostgreSQL direct connection string (for migrations and auth)
- `NEXTAUTH_SECRET` — NextAuth encryption secret
- `NEXTAUTH_URL` — Canonical URL of the application
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` — Email sending configuration

## Development Notes

1. **Prisma client** is generated into `src/generated/prisma` (custom output path).
2. **Build command** runs `prisma generate && next build` to ensure the Prisma client is available at build time.
3. The project uses **Turbopack** as the bundler on Vercel.
4. Auth uses `DIRECT_URL` instead of the pooled connection to avoid pgbouncer prepared statement errors.
5. The `bsc-strategy-2025` directory is excluded from TypeScript and Vercel builds via `.gitignore` and `tsconfig.json`.
6. All downloadable PDFs should be branded with **ALTUS**.

## Git History Summary

The project was initialized as "Altus Forum digital hub" and has evolved through the following milestones:

1. Initial full-stack Next.js platform build
2. Rebranded to "Altus Hub" with updated marketing pages
3. Migrated from SQLite to Supabase PostgreSQL
4. Added ISSA member accounts CRM with data model
5. Added Altus Digital (CSV upload and email features)
6. Added BSC Strategy Masterclass to Altus Academy
7. Added admin portal with nav editor, content manager, email campaigns, and site settings
8. Multiple fixes for TypeScript, NextAuth v5 compatibility, and pgbouncer connection issues

## Owner

**Karina Neff** — kneff@sparkstrategiesgroup.com / kneff@wearepioneer.com

---

*Last updated: March 30, 2026*
