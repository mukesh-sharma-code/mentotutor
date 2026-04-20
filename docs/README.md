# Knowledge Base

This `docs/` folder contains comprehensive documentation for the Mento Tutor Laravel project.

## Files

| File | Contents |
|------|----------|
| [01-project-overview.md](./01-project-overview.md) | What the project is, tech stack, brand info |
| [02-architecture.md](./02-architecture.md) | How Laravel + React work together, request flow, design decisions |
| [03-local-development.md](./03-local-development.md) | First-time setup, daily run commands, debugging |
| [04-api-reference.md](./04-api-reference.md) | All API endpoints with request/response examples and curl commands |
| [05-database-schema.md](./05-database-schema.md) | All tables, columns, types, and constraints |
| [06-frontend-structure.md](./06-frontend-structure.md) | React file structure, whitelabel config, API client, booking flow |
| [07-environment-variables.md](./07-environment-variables.md) | Every `.env` variable explained |
| [08-deployment-hostinger.md](./08-deployment-hostinger.md) | Step-by-step deploy to Hostinger shared hosting |
| [09-troubleshooting.md](./09-troubleshooting.md) | Common errors and how to fix them |
| [10-feature-knowledge-base.md](./10-feature-knowledge-base.md) | **Feature changelog** — log each new feature when you ship it (paths, env, deploy notes) |

Whenever you ship something new feature-wise, add a row to **[10-feature-knowledge-base.md](./10-feature-knowledge-base.md)** (newest first).

## Quick Start for a New Developer

```bash
# 1. Clone repo
git clone <repo-url>
cd aditya/LARAVEL

# 2. Install dependencies
composer install
npm install

# 3. Setup env
cp .env.example .env
php artisan key:generate
# Then fill in DB_*, MAIL_*, ADMIN_EMAIL in .env

# 4. Database (if using MySQL — .env.example defaults to sqlite)
# mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS yourdb;"
php artisan migrate

# 5. Build frontend
npm run build

# 6. Start server
php artisan serve
# Open http://localhost:8000
```

## Key Things to Know

- **All active code is in `LARAVEL/`** — the `BE/` (Go) and `FE/` (React standalone) folders are historical references only.
- **Brand text is all configurable** via `VITE_` env vars — change `.env`, rebuild with `npm run build`.
- **Never use `migrate:fresh`** on any database with real data — it drops everything.
- **Email uses Brevo SMTP** — if it breaks, generate a new key at app.brevo.com and update `MAIL_PASSWORD` in `.env`.
- **Telescope** is at `/telescope` — use it instead of reading raw log files.
- **Node.js on Hostinger** shared hosting is not available — build locally and upload `public/build/`.
