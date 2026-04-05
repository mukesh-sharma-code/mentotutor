# Troubleshooting

## Email not sending (535 Authentication Failed)

**Symptom in logs:**
```
booking: failed to send admin email — 535 5.7.8 Authentication failed
```

**Cause:** The Brevo SMTP key (`MAIL_PASSWORD`) has expired or been revoked.

**Fix:**
1. Go to [app.brevo.com](https://app.brevo.com) → Settings → SMTP & API → SMTP Keys
2. Generate a new SMTP key
3. Update `MAIL_PASSWORD` in `.env`
4. Run `php artisan config:clear`
5. No server restart needed

---

## Bookings not saving

**Check the log:**
```bash
grep "booking" storage/logs/laravel.log | tail -20
```

**Common causes:**
- MySQL is not running → `cd /Users/mukeshdev/Dev && ./native-db.sh start`
- Wrong database in `.env` → confirm `DB_DATABASE=vnaya`
- Migrations not run → `php artisan migrate`

---

## Changes not visible on page

**If you changed a `.env` VITE_ variable:**
```bash
npm run build  # must rebuild JS bundle
```

**If you changed PHP code:**
No restart needed; `php artisan serve` picks up changes on next request.

**If you changed a Blade file:**
```bash
php artisan config:clear  # clear view cache
```

---

## Port already in use (php artisan serve)

```bash
lsof -i :8000 -t          # find the process ID
kill -9 <PID>              # kill it
php artisan serve          # restart
```

---

## Database tables don't exist

```bash
php artisan migrate
```

If you see "table already exists" errors:
```bash
php artisan migrate:status     # see which have run
```

---

## Telescope not showing recent data

Telescope only captures events **after it was installed**. Old requests/logs won't appear. Make a new request and it will show immediately.

---

## Two php artisan serve instances running

Check and kill:
```bash
lsof -i :8000 -i :8001
kill -9 <PID1> <PID2>
php artisan serve
```

---

## Brevo email — which key is active?

Check in logs after a booking:
```
booking: email config {"smtp_user":"a4c553001@smtp-brevo.com", ...}
```
Cross-check this with the active key on [app.brevo.com](https://app.brevo.com) → SMTP & API.
