# Growth Catalyst Website

Minimalist black & white corporate website for **Growth Catalyst Pvt. Ltd.** — process-oriented software & IT consulting.

**Stack:** Next.js 16 (App Router) · Tailwind CSS v4 · PostgreSQL · Prisma · NextAuth

## Project Structure

```
website/
├── prisma/
│   ├── schema.prisma          # Database models
│   └── seed.ts                # Initial admin, categories, sample data
├── src/
│   ├── app/
│   │   ├── (site)/            # Public pages (navbar + footer)
│   │   │   ├── page.tsx       # Homepage
│   │   │   ├── about/
│   │   │   ├── services/
│   │   │   ├── products/
│   │   │   ├── team/
│   │   │   ├── blogs/
│   │   │   └── contact/
│   │   ├── admin/
│   │   │   ├── login/         # Admin authentication
│   │   │   └── (panel)/       # Protected dashboard
│   │   │       ├── blogs/     # Blog CRUD
│   │   │       ├── categories/
│   │   │       └── settings/  # Dynamic site copy
│   │   └── api/               # REST endpoints
│   ├── components/
│   │   ├── layout/            # Navbar, Footer
│   │   ├── home/              # Hero, Process, ClientSlider
│   │   ├── admin/             # Admin UI components
│   │   └── ...
│   ├── lib/                   # prisma, auth, utils
│   └── generated/prisma/      # Prisma client (after generate)
└── .env.example
```

## Database Schema

| Model | Purpose |
|-------|---------|
| `User` | Admin authentication |
| `BlogCategory` | Blog taxonomy |
| `BlogPost` | Blog articles with slug, publish status |
| `Product` | Products managed via admin |
| `SiteSetting` | Key-value dynamic copy (hero text, etc.) |
| `Client` | Client logo slider data |
| `TeamMember` | Team profiles |
| `ContactMessage` | Contact form submissions |
| `NewsletterSubscriber` | Footer newsletter emails |

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` with your PostgreSQL `DATABASE_URL` and generate `AUTH_SECRET`:

```bash
openssl rand -base64 32
```

### 3. Set up database

```bash
npx prisma migrate dev --name init
npx prisma generate
npm run db:seed
```

### 4. Run development server

```bash
npm run dev
```

- **Website:** http://localhost:3000
- **Admin:** http://localhost:3000/admin/login
- **Default credentials:** `admin@growthcatalyst.com.np` / `admin123`

## Admin Panel (`/admin`)

- **Dashboard** — overview stats
- **Blogs** — create, edit, delete posts
- **Categories** — manage blog categories
- **Settings** — update hero headline/subheadline dynamically

## Design

Strict black & white minimalism with Inter typography, generous whitespace, and uppercase tracking for navigation labels.
