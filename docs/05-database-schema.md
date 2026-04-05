# Database Schema

**Database:** `vnaya`  
**Connection:** MySQL 8.x, `127.0.0.1:3306`

---

## Table: `demo_bookings`

Stores all demo booking form submissions.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | bigint unsigned | PK, auto-increment | |
| `date` | varchar(32) | NOT NULL | e.g. `2026-04-10` |
| `time` | varchar(32) | NOT NULL | e.g. `14:00` |
| `timezone` | varchar(128) | NOT NULL | e.g. `Asia/Kolkata` |
| `first_name` | varchar(100) | NOT NULL | |
| `last_name` | varchar(100) | NOT NULL | |
| `email` | varchar(150) | NOT NULL | not unique — same student can book multiple times |
| `contact_no` | varchar(32) | NOT NULL | |
| `country` | varchar(100) | NOT NULL | |
| `source` | varchar(100) | NOT NULL | how they heard about us |
| `grade` | varchar(100) | NOT NULL | e.g. `Grade 7-9` |
| `subject` | varchar(100) | NOT NULL | e.g. `Math` |
| `topic` | varchar(200) | NOT NULL | specific topic requested |
| `additional_info` | text | NULLABLE | free-form notes |
| `created_at` | timestamp | DEFAULT CURRENT_TIMESTAMP | auto-set by model boot |

> No `updated_at` column — bookings are immutable once created.

---

## Table: `users`

Stores registered users (lightweight, no auth).

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | bigint unsigned | PK, auto-increment |
| `name` | varchar(120) | NOT NULL |
| `email` | varchar(150) | NOT NULL, UNIQUE |
| `phone` | varchar(32) | NULLABLE |
| `created_at` | timestamp | auto-managed |
| `updated_at` | timestamp | auto-managed |

---

## Other Tables (Laravel internals, do not manually edit)

| Table | Purpose |
|-------|---------|
| `migrations` | Tracks which migrations have run |
| `cache` / `cache_locks` | File-based cache (not actively used) |
| `jobs` / `job_batches` / `failed_jobs` | Queue tables (not used — queue is sync) |
| `telescope_entries` | Laravel Telescope debug data |
| `telescope_entries_tags` | Telescope tags |
| `telescope_monitoring` | Telescope monitoring config |

---

## Running Migrations

```bash
# Run pending migrations
php artisan migrate

# Rollback last batch
php artisan migrate:rollback

# ⚠️ DANGER: drops ALL tables and reruns from scratch
php artisan migrate:fresh
```

> **WARNING:** Never run `migrate:fresh` on a production database or any database with important data. It drops every table.
