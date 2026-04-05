# Hostinger Deployment Guide

## Server Details

| Field | Value |
|-------|-------|
| Hosting provider | Hostinger (shared hosting) |
| Domain | mentotutor.com |
| PHP version | 8.3.30 |
| Composer version | 2.8.11 |
| SSH IP | 92.249.46.1 |
| SSH Port | 65002 |
| SSH User | u310526789 |
| Home directory | `/home/u310526789/` |
| Domains directory | `/home/u310526789/domains/` |


> Credentials are stored locally in `aditya/creds` (gitignored). Never commit that file.

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
From your local machine:
```bash
# Exclude vendor, node_modules, .env, and build artifacts
rsync -avz --exclude='vendor' --exclude='node_modules' --exclude='.env' --exclude='public/build' \
  -e "ssh -p 65002" \
  /Users/mukeshdev/Dev/aditya/LARAVEL/ \
  u310526789@92.249.46.1:/home/u310526789/domains/mentotutor.com/
```

### 5. SSH into the server and finish setup
```bash
ssh -p 65002 u310526789@92.249.46.1
cd ~/domains/mentotutor.com

# Install PHP dependencies (no dev packages)
composer install --no-dev --optimize-autoloader

# Create .env and fill in production values
cp .env.example .env
nano .env      # fill in DB, MAIL, APP details

# Generate app key
php artisan key:generate

# Run migrations
php artisan migrate --force

# Build the React frontend
npm install
npm run build

# Set correct permissions
chmod -R 755 storage bootstrap/cache
```

### 6. Point the domain document root
In **hPanel → Domains → Manage → Document Root**, set it to:
```
/home/u310526789/domains/mentotutor.com/public
```

---

## Redeployment (After Code Changes)

```bash
# From local machine — upload changed files
rsync -avz --exclude='vendor' --exclude='node_modules' --exclude='.env' --exclude='public/build' \
  -e "ssh -p 65002" \
  /Users/mukeshdev/Dev/aditya/LARAVEL/ \
  u310526789@92.249.46.1:/home/u310526789/domains/mentotutor.com/

# SSH in and rebuild
ssh -p 65002 u310526789@92.249.46.1
cd ~/domains/mentotutor.com
composer install --no-dev --optimize-autoloader
npm run build
php artisan config:clear
php artisan cache:clear
php artisan route:clear
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

- **Node.js** is not available on Hostinger shared hosting — build the frontend (`npm run build`) **locally** and upload the `public/build/` folder separately, OR use GitHub Actions / CI to build and deploy.
- Laravel Telescope is a **dev dependency** — not installed when `composer install --no-dev` is run in production. Do not access `/telescope` from production.
- **Never run `php artisan migrate:fresh` on production** — it drops all tables.
