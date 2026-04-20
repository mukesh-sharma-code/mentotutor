# Local Development Setup

## Prerequisites

| Tool | Version | Check |
|------|---------|-------|
| PHP | 8.3+ | `php -v` |
| Composer | 2.x | `composer --version` |
| Node.js | 18+ | `node -v` |
| npm | 9+ | `npm -v` |
| MySQL | 8.x | running via `./native-db.sh start` |

## First-Time Setup

```bash
# 1. Clone the repo and enter the Laravel folder
cd aditya/LARAVEL

# 2. Install PHP dependencies
composer install

# 3. Install JS dependencies
npm install

# 4. Copy env file and set your values
cp .env.example .env
php artisan key:generate

# 5. Set up database
# .env.example defaults to sqlite. To use MySQL instead:
#   Change DB_CONNECTION=mysql in .env
#   Set DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD
#   Create the database: mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS yourdb;"

# 6. Run migrations
php artisan migrate

# 7. Build the React frontend (one-time)
npm run build
```

## Running the Project (Daily)

### Step 1 — Start MySQL (and Redis/MongoDB if needed)
```bash
cd /Users/mukeshdev/Dev
./native-db.sh start
```

### Step 2 — Start Laravel server
```bash
cd /Users/mukeshdev/Dev/aditya/LARAVEL
php artisan serve
```

Open `http://localhost:8000`

### Optional: Hot-reload React during development
In a second terminal:
```bash
cd /Users/mukeshdev/Dev/aditya/LARAVEL
npm run dev
```
This enables instant browser refresh on every `.jsx` change. Requires the Laravel server to be running alongside.

### Build for production testing
```bash
npm run build
php artisan serve
```

## Debugging

### Laravel Telescope
Open `http://localhost:8000/telescope` — shows all requests, queries, emails, exceptions, and logs in a visual dashboard.

### Log file
```bash
tail -f storage/logs/laravel.log
```

### Clear all caches (if something seems stale)
```bash
php artisan config:clear && php artisan cache:clear && php artisan route:clear
```

## Database Management

> `.env.example` defaults to **sqlite** (`database/database.sqlite`). For MySQL, update `DB_CONNECTION=mysql` and set `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` in your `.env`.

### Via command line (MySQL)
```bash
mysql -u <your_user> -p
USE <your_database>;
SELECT * FROM demo_bookings;
SELECT * FROM users;
```

### Via phpMyAdmin
```bash
cd /Users/mukeshdev/Dev
./native-db.sh phpmyadmin
# Open http://localhost:8080
# Login with your MySQL credentials
```
