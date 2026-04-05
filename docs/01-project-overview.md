# Project Overview

## What Is This Project?

**Mento Tutor** is a tutoring platform website. It was originally built as two separate services — a Go (Beego) backend and a React frontend — but was migrated to a unified **Laravel 12** application to allow deployment on shared hosting (Hostinger), which does not support Go.

## Repository Structure

```
aditya/                      ← Root of the repo
├── BE/                      ← Original Go backend (kept for reference, NOT used)
├── FE/                      ← Original React frontend source (kept for reference, NOT used)
├── LARAVEL/                 ← Active project — Laravel 12 + React unified app
├── docs/                    ← This knowledge base
├── creds                    ← Local credentials file (gitignored, never commit)
└── .gitignore               ← Root gitignore
```

> **Note:** `BE/` and `FE/` folders are kept for historical reference only. All active development happens inside `LARAVEL/`.

## Tech Stack

| Layer        | Technology                     |
|--------------|--------------------------------|
| Backend      | Laravel 12, PHP 8.3            |
| Frontend     | React 18, Vite 8, TailwindCSS 4|
| Database     | MySQL (database: `vnaya`)       |
| Email        | Brevo (formerly Sendinblue) SMTP|
| Hosting      | Hostinger shared hosting        |
| Debugger     | Laravel Telescope (at `/telescope`) |

## Brand

- **Brand name:** Mento Tutor  
- **Domain:** mentotutor.com (hosted on Hostinger)
- **Support email:** support@vnaya.com
- **Admin/notification email:** mukesh.sharma.code@gmail.com

## What the App Does

1. **Landing page** — a marketing page showing the tutoring platform with hero section, level cards, top locations, and footer.
2. **Book a Demo form** — a 2-step form that saves a booking to the database and sends an admin email notification via Brevo SMTP.
3. **User registration** — a basic user creation API endpoint.
4. **Admin visibility** — Laravel Telescope at `/telescope` for inspecting requests, queries, emails, and logs.
