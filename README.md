# Tuition Platform BD

Cloudflare Workers + D1 ভিত্তিক mobile-first tuition listing platform. Public visitor website, Super Admin panel, Media Agency panel, structured search/filter, featured listings, commission fields, reports, activity logs, SEO pages, privacy/terms এবং direct phone/WhatsApp contact included.

## Live routes

- `/` — public visitor website
- `/admin` — Super Admin panel
- `/media` — Media Agency panel
- `/tuition?code=...` — details page
- `/privacy` and `/terms` — policy pages

## Local development

```bash
npx wrangler dev
```

## Cloudflare D1 setup

For a fresh database, run migrations in order:

```bash
for f in migrations/*.sql; do npx wrangler d1 execute tuition-platform-db --remote --file="$f"; done
```

Migrations cover the base schema, reports/logs, custom fields, views analytics, media profile/default commission/status, and structured location fields.

For the existing production database, only apply migrations that have not already been applied. Never rerun an `ALTER TABLE ADD COLUMN` migration.

Set the admin password as a Cloudflare secret:

```bash
npx wrangler secret put ADMIN_PASSWORD
```

Deploy:

```bash
npx wrangler deploy
```

## Implemented features

### Visitor

- No account required
- Search by code, location, class, subject or description
- Division, district, thana, area, class, subject, tuition type, gender, salary and days filters
- Featured and latest listing sections
- Fixed, negotiable and commission display support
- Full details page, call, WhatsApp and report flow
- Bangla/English toggle, responsive mobile bottom navigation
- Safety notice, privacy, terms, robots and sitemap

### Super Admin

- Dashboard: total, active, expired, featured, hidden, views, media, reports and expiry reminders
- Create, edit, feature, hide/unhide and permanently delete tuition posts
- Create, edit, enable/disable and suspend media agencies
- Default media commission and profile management
- Reports: resolve or hide reported post
- Custom field definitions
- Activity logs
- Protected admin authentication and hashed sessions

### Media Agency

- Admin-created account only
- Login/session protection
- Own dashboard: total, active, expired and published posts
- Agency profile: name, logo, phone, WhatsApp, description, social links and default commission
- Create, edit, publish, save draft and delete own tuition posts
- Structured tuition fields and post-level commission override
- Cannot access another agency's posts or admin routes

## Security

Media passwords and session tokens are hashed. Public detail/report routes reject hidden, deleted, draft and expired posts. Validate and rotate any Cloudflare token that has been exposed.
