# Hostinger Deployment Guide

## Server Details

| Field | Value |
|-------|-------|
| Hosting provider | Hostinger (shared hosting) |
| Domain | mentotutor.com |
| PHP (CLI default) | 8.3.x — **Laravel 13 requires 8.4+**; use PHP 8.4 binary below |
| PHP 8.4 (use for Composer & Artisan) | `/opt/alt/php84/usr/bin/php` |
| Composer version | 2.8.11 |
| SSH IP | 92.249.46.1 |
| SSH Port | 65002 |
| SSH User | u310526789 |
| Home directory | `/home/u310526789/` |
| Domains directory | `/home/u310526789/domains/` |


> Credentials are stored locally in `aditya/creds` (gitignored). Never commit that file.

---

## Verified flow (`mentotutor.online`)

What worked on this host: **git pull in the app folder**, **symlink `public_html`**, then **upgrade PHP to 8.4** in hPanel (fixes 403 + Composer’s `>= 8.4.0` platform check for Laravel 13).

```bash
cd ~/domains/mentotutor.online/mentotutor
git pull   # deploy latest code

cd ~/domains/mentotutor.online
rm -rf public_html
ln -snf /home/u310526789/domains/mentotutor.online/mentotutor/public public_html
ls -la public_html
```

Then in **hPanel → Advanced → PHP** (or **Websites → Manage → PHP**): set **PHP 8.4** for `mentotutor.online`.

After that, run `composer install` and `php artisan …` from `mentotutor/` (if CLI still reports 8.3, use `/opt/alt/php84/usr/bin/php` as documented below).

---

## One-Time Setup (First Deployment)

### 1. Activate SSH on Hostinger
- Go to **hPanel → Advanced → SSH Access**
- Enable SSH access

### 2. Add your SSH public key (recommended — avoids password every time)
Your local public key:
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAID2TrF5lBkTQyWfnso+NEDRGE61l1+XyTnT7cfCoralt mukeshdev@bitbucket
```
- Go to **hPanel → Advanced → SSH Access → Add SSH Key**
- Paste the key above and save

### 3. Connect via SSH
```bash
ssh -p 65002 u310526789@92.249.46.1
```

### 4. Upload the project
Put the Laravel app **beside** `public_html`, not inside it. Example layout:

```
~/domains/YOURDOMAIN/
  mentotutor/          ← project root (contains artisan, app/, public/)
  public_html/         ← will become a symlink (next step)
  DO_NOT_UPLOAD_HERE/
```

From your local machine:
```bash
# Exclude vendor, node_modules, .env, and build artifacts
rsync -avz --exclude='vendor' --exclude='node_modules' --exclude='.env' --exclude='public/build' \
  -e "ssh -p 65002" \
  /Users/mukeshdev/Dev/aditya/LARAVEL/ \
  u310526789@92.249.46.1:/home/u310526789/domains/YOURDOMAIN/mentotutor/
```

### 5. Symlink `public_html` → Laravel `public` (no document-root option on this host)
Hostinger serves the site from **`public_html`**. Laravel must use **`public/`** as the only web-exposed folder. Replace `public_html` with a symlink:

```bash
ssh -p 65002 u310526789@92.249.46.1
cd ~/domains/YOURDOMAIN

# Remove the real public_html folder (only if empty or you have backed up what you need)
rm -rf public_html

# Point public_html at Laravel's public directory (use absolute target — reliable)
ln -snf /home/u310526789/domains/YOURDOMAIN/mentotutor/public public_html

# Verify: should show public_html -> .../mentotutor/public
ls -la public_html
```

### 6. Permissions (often required or you get 403)
The web server must traverse each directory in the path to the symlink target:

```bash
chmod 711 ~
chmod 711 ~/domains
chmod 711 ~/domains/YOURDOMAIN
chmod 755 ~/domains/YOURDOMAIN/mentotutor
chmod 755 ~/domains/YOURDOMAIN/mentotutor/public

cd ~/domains/YOURDOMAIN/mentotutor
chmod -R 775 storage bootstrap/cache
```

### 7. Composer, `.env`, Artisan
```bash
cd ~/domains/YOURDOMAIN/mentotutor

PHP84=/opt/alt/php84/usr/bin/php

$PHP84 "$(command -v composer)" install --no-dev --optimize-autoloader
# If that fails: $PHP84 ~/composer.phar install --no-dev --optimize-autoloader

cp .env.example .env
nano .env

$PHP84 artisan key:generate
$PHP84 artisan migrate --force
$PHP84 artisan storage:link
$PHP84 artisan config:cache
```

Build assets **locally** (`npm run build`), upload **`mentotutor/public/build/`** to the server.

### 8. If you still see 403
- Confirm: `ls -la ~/domains/YOURDOMAIN/public_html` shows the symlink and `index.php` exists under `mentotutor/public/`.
- Create `mentotutor/public/test.txt` with text `ok` and open `https://YOURDOMAIN/test.txt`. If that 403s, permissions/path are still wrong — recheck `chmod 711` on `~`, `domains`, and `YOURDOMAIN`.
- Ask Hostinger support whether **symbolic links** are allowed for `public_html` on your plan; some tiers need it enabled.
- In **hPanel**, set **PHP 8.4** for this domain (even when using symlink).

**Optional:** If your panel later offers **Document root**, you can point it to `.../mentotutor/public` and stop using the symlink.

---

## Redeployment (After Code Changes)

```bash
# From local machine — upload changed files (into mentotutor/, not public_html)
rsync -avz --exclude='vendor' --exclude='node_modules' --exclude='.env' --exclude='public/build' \
  -e "ssh -p 65002" \
  /Users/mukeshdev/Dev/aditya/LARAVEL/ \
  u310526789@92.249.46.1:/home/u310526789/domains/YOURDOMAIN/mentotutor/

# SSH in
ssh -p 65002 u310526789@92.249.46.1
cd ~/domains/YOURDOMAIN/mentotutor
PHP84=/opt/alt/php84/usr/bin/php
$PHP84 "$(command -v composer)" install --no-dev --optimize-autoloader
# npm run build locally; upload public/build/
$PHP84 artisan config:clear
$PHP84 artisan cache:clear
$PHP84 artisan route:clear
```

---

## Production `.env` Values to Update

These values **must** be changed from local to production:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://mentotutor.com
APP_KEY=<generate fresh with: php artisan key:generate>

DB_HOST=<hostinger mysql host>
DB_DATABASE=<hostinger db name>
DB_USERNAME=<hostinger db user>
DB_PASSWORD=<hostinger db password>

MAIL_PASSWORD=<current brevo smtp key>
```

---

## Important Notes

- **Web root:** This setup uses **`public_html` → symlink → `mentotutor/public`**. Do not upload the Laravel app *into* `public_html` as the project root.
- **PHP 8.4:** In hPanel, set the site’s PHP version to **8.4** so the website matches Composer. On SSH, always use `/opt/alt/php84/usr/bin/php` for `composer` and `artisan` if the default `php` is 8.3.
- **Node.js** is not available on Hostinger shared hosting — build the frontend (`npm run build`) **locally** and upload the `public/build/` folder separately, OR use GitHub Actions / CI to build and deploy.
- Laravel Telescope is a **dev dependency** — not installed when `composer install --no-dev` is run in production. Do not access `/telescope` from production.
- **Never run `php artisan migrate:fresh` on production** — it drops all tables.
