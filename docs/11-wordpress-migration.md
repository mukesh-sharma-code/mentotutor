# Migrating from WordPress to Laravel

Replacing an active WordPress site with this custom Laravel + React stack requires careful steps to ensure zero downtime, no loss of SEO rankings, and proper server configuration. 

This guide outlines the exact process you should follow when you are ready to make the switch.

## Phase 1: Preparation & Backup

### 1. Full Backup
Before making any changes to your live server:
- Backup your entire WordPress `public_html` directory.
- Export your WordPress MySQL database.
- Download these backups locally so you have a guaranteed restore point.

### 2. Map Your Old URLs for SEO
React Router handles your new URLs. If your WordPress site had links like `mentotutor.com/about-us`, but the new React site uses `mentotutor.com/about`, any user (or Google bot) clicking an old link will hit a 404 error.
- Create a list of your most popular WordPress pages and their exact URLs.
- You will need to set up **301 Redirects** for these later to preserve SEO.

### 3. Pre-build Assets Locally
To avoid needing Node.js installed on your production server:
1. Run `npm run build` on your local machine.
2. Ensure the `public/build/` directory is generated successfully.
3. You will upload this built folder along with the rest of your Laravel project.

---

## Phase 2: Server Deployment

### 1. Clear the Public Directory
Do not mix WordPress and Laravel files.
- On your hosting panel (e.g., Hostinger, cPanel), navigate to your `public_html` or root domain folder.
- Create a new folder called `old_wp_backup`.
- Move **ALL** existing WordPress files (including hidden files like `.htaccess`) into `old_wp_backup`. 
- Your root directory should now be completely empty.

### 2. Upload Laravel Project
- Zip your Laravel project (exclude `/vendor` and `/node_modules` to save time).
- Upload and extract the zip file into your server's root directory.
- Run `composer install --optimize-autoloader --no-dev` on the server via SSH (or upload the `/vendor` folder manually if SSH is unavailable).

### 3. Update the Document Root (CRITICAL)
WordPress runs from the root folder (`public_html`), but **Laravel runs from the `/public` folder**.
- If you do not change the Document Root, your environment variables and source code will be exposed!
- In your hosting panel, find the "Domain settings" or "Document Root" settings.
- Change the target path from `public_html` to `public_html/public`.

### 4. Configure the Environment
- Copy the `.env.example` file and rename it to `.env`.
- Update the following keys for production:
  ```env
  APP_ENV=production
  APP_DEBUG=false
  APP_URL=https://www.mentotutor.com
  
  # Ensure these Whitelabel variables are correct
  VITE_BRAND_NAME="Mento Tutor"
  VITE_BRAND_FULL_NAME="Mento Tutor LLC"
  VITE_SUPPORT_EMAIL="support@mentotutor.com"
  ```
- Generate a new app key by running: `php artisan key:generate`.

### 5. Set File Permissions
Laravel requires write access to specific folders:
```bash
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```

---

## Phase 3: Post-Launch & SEO

### 1. Configure the `.htaccess` File
Since Laravel uses a single-page React frontend, all traffic must be routed to `index.php`. Ensure your `public/.htaccess` file contains the standard Laravel fallback routing (this is included by default in the codebase).

### 2. Add 301 Redirects
If you mapped old WordPress URLs in Phase 1, add 301 redirects to your `.htaccess` file (inside the `public` folder) to safely forward traffic to the new React routes:
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # Example Redirects
    RewriteRule ^old-about-page/?$ /about [R=301,L]
    RewriteRule ^contact-us\.php$ /contact-us [R=301,L]
    
    # Laravel Default Routing
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
```

### 3. Verify the Deployment
- Visit your website. The homepage should instantly load.
- Hard refresh (Ctrl+Shift+R) to bypass cache and ensure the new CSS/JS assets are loading from `public/build/`.
- Navigate to the `/privacy-policy` and `/terms-and-conditions` pages to ensure React Router is functioning without 404 errors.

---

## Rollback Plan (If Something Goes Wrong)
If the Laravel deployment fails and you need the site back online immediately:
1. Revert the Document Root in your hosting panel back to `public_html`.
2. Move your Laravel files into a new `laravel_failed_deploy` folder.
3. Move the contents of `old_wp_backup` back out into the main root folder.
4. The WordPress site will instantly be back online.
