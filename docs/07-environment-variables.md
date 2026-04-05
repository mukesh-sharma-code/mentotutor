# Environment Variables

All configuration lives in `LARAVEL/.env`. This file is **gitignored** — never commit it.

When deploying to a new environment, copy `.env.example` and fill in real values.

---

## App

| Variable | Example | Description |
|----------|---------|-------------|
| `APP_NAME` | `Mento Tutor` | Site name — appears in browser tab title, email subjects |
| `APP_ENV` | `local` / `production` | Environment mode |
| `APP_KEY` | `base64:...` | Laravel encryption key — generate with `php artisan key:generate` |
| `APP_DEBUG` | `true` / `false` | Show detailed errors — **must be `false` in production** |
| `APP_URL` | `https://mentotutor.com` | Full base URL of the app |

---

## Database

| Variable | Example | Description |
|----------|---------|-------------|
| `DB_CONNECTION` | `mysql` | Database driver |
| `DB_HOST` | `127.0.0.1` | MySQL host |
| `DB_PORT` | `3306` | MySQL port |
| `DB_DATABASE` | `vnaya` | Database name |
| `DB_USERNAME` | `root` | MySQL user |
| `DB_PASSWORD` | `mypassword` | MySQL password |

---

## Email (Brevo SMTP)

| Variable | Example | Description |
|----------|---------|-------------|
| `MAIL_MAILER` | `smtp` | Mail driver |
| `MAIL_HOST` | `smtp-relay.brevo.com` | Brevo SMTP host |
| `MAIL_PORT` | `587` | SMTP port |
| `MAIL_USERNAME` | `a4c553001@smtp-brevo.com` | Brevo login (fixed, from Brevo dashboard) |
| `MAIL_PASSWORD` | `xsmtpsib-...` | Brevo SMTP key — **generate a new one from Brevo dashboard if authentication fails (535 error)** |
| `MAIL_FROM_ADDRESS` | `mukesh.sharma.code@gmail.com` | Sender email shown to recipient |
| `MAIL_FROM_NAME` | `${APP_NAME}` | Sender name (auto-uses APP_NAME) |
| `ADMIN_EMAIL` | `mukesh.sharma.code@gmail.com` | Where booking notification emails are sent |

---

## Frontend (VITE_ variables)

> These are baked into the JS bundle at build time. After changing any `VITE_` variable, run `npm run build`.

### Branding
| Variable | Example |
|----------|---------|
| `VITE_BRAND_NAME` | `Mento Tutor` |
| `VITE_BRAND_FULL_NAME` | `Mento Tutor` |
| `VITE_SUPPORT_EMAIL` | `support@vnaya.com` |
| `VITE_API_BASE_URL` | `` (empty = same origin) |

### Navigation labels
| Variable | Default |
|----------|---------|
| `VITE_NAV_HOME_LABEL` | `Home` |
| `VITE_NAV_ABOUT_LABEL` | `About` |
| `VITE_NAV_CONTACT_LABEL` | `Contact` |
| `VITE_BOOK_DEMO_LABEL` | `Book a Demo` |

### Home page text
| Variable | Default |
|----------|---------|
| `VITE_HOME_EYEBROW` | `Tutoring Platform` |
| `VITE_HOME_TITLE` | `Learning support that scales with every student.` |
| `VITE_HOME_DESCRIPTION` | *(long description text)* |
| `VITE_TOAST_BOOKING_SUCCESS` | `Thank you! Your demo booking request has been submitted.` |

### Theme colors
| Variable | Default | Notes |
|----------|---------|-------|
| `VITE_THEME_PRIMARY` | `#e11d48` | Main brand color (buttons, links) |
| `VITE_THEME_PRIMARY_DARK` | `#be123c` | Hover state of primary |
| `VITE_THEME_GRADIENT_START` | `#fb7185` | Header/modal gradient start |
| `VITE_THEME_GRADIENT_END` | `#e11d48` | Header/modal gradient end |
| `VITE_THEME_PAGE_FROM` | `#fff1f2` | Page background gradient start |
| `VITE_THEME_PAGE_TO` | `#f8fafc` | Page background gradient end |
