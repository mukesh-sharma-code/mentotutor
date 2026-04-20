# Feature knowledge base

Use this file whenever **something new is developed or shipped feature-wise**. One short entry per feature (or per meaningful slice) keeps deploys, support, and future you aligned.

## How to add an entry

1. Add a new row to the **changelog table** (newest first), or a dated **section** if the change needs bullets.
2. Include enough to act without opening every file: **what it does**, **where it lives** (paths), **env or deploy notes** if any.
3. Link to deeper docs (`04-api-reference.md`, `08-deployment-hostinger.md`, etc.) instead of duplicating them.

### Entry template (copy)

```markdown
| YYYY-MM-DD | Short title | What / why | Key paths & notes |
```

---

## Changelog (newest first)

| Date | Feature / change | Summary | Key paths & notes |
|------|------------------|---------|-------------------|
| 2026-04 | Demo booking & mail | Multi-step demo booking UI; API creates booking; admin email (HTML + text), Reply-To lead, multi To/CC from `ADMIN_EMAIL` / `ADMIN_CC`. | `resources/js/features/demo-booking/DemoBookingModal.jsx`, `app/Http/Controllers/Api/V1/DemoBookingController.php`, `CreateBookingRequest`, `app/Mail/BookingNotification.php`, `config/mail.php`, `resources/views/emails/booking-notification*.blade.php` |
| 2026-04 | Hostinger deploy (mentotutor.online) | `public_html` symlink → `mentotutor/public`; PHP 8.4 in hPanel; git pull in app dir. | [08-deployment-hostinger.md](./08-deployment-hostinger.md) — section *Verified flow* |
| 2026-04 | Frontend build in repo | `public/build` may be tracked for hosts without `npm`; Vite env baked at build time. | `.gitignore`, `npm run build`, upload `public/build` when not using CI |

*(Add new rows above the oldest row you want to keep; trim or archive very old rows if the table gets huge.)*

---

## Optional: larger features

For big work, add a subsection here **or** a dedicated doc (e.g. `docs/features/booking.md`) and link it from one row in the table above.
