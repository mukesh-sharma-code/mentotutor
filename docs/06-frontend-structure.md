# Frontend Structure

The React app lives inside `LARAVEL/resources/js/`. It was originally a standalone Vite+React project in `FE/` and was moved here to be served by Laravel.

## Entry Point

```
resources/js/main.jsx       ← React entry point (mounts <App /> into #root)
resources/js/index.css      ← Global CSS (TailwindCSS v4 import)
resources/js/app.js         ← Laravel's default JS bootstrap (kept, unused by React)
resources/js/bootstrap.js   ← Laravel's JS bootstrap helper (imports axios)
resources/views/app.blade.php ← HTML shell Laravel serves for every route
```

## Directory Structure

```
resources/js/
├── main.jsx                     ← Entry: renders <App />
├── index.css                    ← Global styles (Tailwind v4)
├── app/
│   └── App.jsx                  ← Root component: theme, toast, layout
├── components/
│   └── layout/
│       ├── SiteHeader.jsx       ← Navigation bar
│       └── SiteFooter.jsx       ← Footer with copyright and support email
├── features/
│   ├── demo-booking/
│   │   └── DemoBookingModal.jsx ← 2-step booking form (Step 1: date/time, Step 2: personal info)
│   └── users/
│       └── (user-related components)
├── pages/
│   └── home/
│       └── HomePage.jsx         ← Main landing page
├── assets/
│   └── (images, etc.)
└── shared/
    ├── api/
    │   ├── client.js            ← fetch wrapper (builds URL, handles errors)
    │   ├── booking.js           ← createDemoBooking() function
    │   └── user.js              ← createUser() function
    ├── config/
    │   └── whitelabel.js        ← All brand/text config (reads from VITE_ env vars)
    └── ui/
        └── (shared UI components)
```

## Whitelabel Config (`shared/config/whitelabel.js`)

All visible text, branding, and theme colors are controlled here. Values are read from `.env` VITE_ variables with hardcoded fallbacks.

```js
export const whitelabel = {
  brandName,       // VITE_BRAND_NAME   → displayed in header, footer
  brandFullName,   // VITE_BRAND_FULL_NAME
  logoUrl,         // VITE_LOGO_URL     → logo image URL in header
  supportEmail,    // VITE_SUPPORT_EMAIL → displayed in footer
  nav: { home, about, contact },
  cta: { bookDemo },
  home: { eyebrow, title, description },
  toast: { bookingSuccess },
  theme: { primary, primaryDark, gradientStart, gradientEnd, pageFrom, pageTo }
}
```

To change **any text or color** on the site, update the corresponding `VITE_` variable in `.env` and rebuild: `npm run build`.

## API Client (`shared/api/client.js`)

All API calls go through `apiRequest()`:
- Reads `VITE_API_BASE_URL` from env (empty string = same origin)
- Adds `Content-Type: application/json` header automatically
- On non-2xx response: throws `Error` with `.status` and `.errors` properties
- On success: returns parsed JSON payload

## Booking Form Flow

1. User clicks "Book a Demo" button
2. `DemoBookingModal` mounts with pre-filled defaults (removed in production, currently has dummy data for testing)
3. **Step 1**: user selects date, time, timezone → clicks Next
4. **Step 2**: user fills personal info → clicks Submit
5. `createDemoBooking()` POSTs to `/api/v1/demo-bookings`
6. On success: modal closes, success toast shown
7. On error: error message shown inline per field

## Building the Frontend

```bash
# Development (hot reload — requires npm run dev in a second terminal)
npm run dev

# Production build (output to public/build/)
npm run build
```

> After `npm run build`, the built assets are in `public/build/` and `public/build/manifest.json` tells Laravel where to inject them via `@vite()` in the Blade template.

## Adding a New Page

1. Create `resources/js/pages/your-page/YourPage.jsx`
2. Add a route in `App.jsx` (if using React Router) or link from existing pages
3. The Laravel catch-all in `routes/web.php` already handles any URL → React takes over
