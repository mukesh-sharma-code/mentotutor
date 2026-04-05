# Architecture

## How Laravel + React Work Together

This is a **monolith** — a single Laravel app serves both the API (JSON) and the React SPA (HTML). There is no separate server for the frontend.

```
Browser
   │
   ▼
Laravel (php artisan serve / Apache on Hostinger)
   ├── GET  /             → serves resources/views/app.blade.php   → React SPA boots
   ├── GET  /anything     → same catch-all → React Router handles it
   ├── GET  /health       → JSON health check
   ├── POST /api/v1/demo-bookings  → DemoBookingController
   ├── GET  /api/v1/demo-bookings  → DemoBookingController
   ├── POST /api/v1/users          → UserController
   ├── GET  /api/v1/users          → UserController
   └── GET  /telescope    → Laravel Telescope dashboard
```

## Request Flow (Booking Example)

```
User fills form → React calls POST /api/v1/demo-bookings (same origin)
                            │
                   CreateBookingRequest (validates)
                            │
                   DemoBookingController::store()
                            │
                   DemoBooking::create()  → MySQL demo_bookings table
                            │
                   BookingNotification Mailable → Brevo SMTP → Admin email
                            │
                   JSON 201 response → React shows success toast
```

## Why Same-Origin API Calls

The React frontend calls `/api/v1/...` with **no base URL prefix**. This means:
- In development: `http://localhost:8000/api/v1/...`
- In production: `https://mentotutor.com/api/v1/...`

No CORS headers needed for the SPA itself. The CORS config (`config/cors.php`) exists only for external clients.

## Key Design Decisions

| Decision | Reason |
|----------|--------|
| camelCase JSON keys | React was written expecting camelCase (from the Go backend). Kept consistent via `toCamelArray()` on models. |
| Flat error map `{"errors": {"field": "message"}}` | Matches the original Go validation error format, zero React changes needed. |
| `$timestamps = false` on DemoBooking | Only `created_at` is needed, not `updated_at`. Managed manually on model boot. |
| No queued emails | Email is sent inline (synchronously). Keeps deployment simple for shared hosting (no Redis/queue worker needed). |
| Telescope as `--dev` | Installed only for development; excluded from production Composer install. |
