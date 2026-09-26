# Tuition Platform BD

Cloudflare Workers + D1 ভিত্তিক mobile-first tuition listing platform. Public visitor website, Super Admin panel, Media Agency panel, search/filter, featured listings, commission fields, reports, activity logs, SEO pages, privacy/terms এবং direct phone/WhatsApp contact included.

## Live routes

- `/` — public listings
- `/admin` — Super Admin panel
- `/media` — Media Agency panel
- `/tuition?code=...` — listing details
- `/privacy` and `/terms` — public policy pages

## Local development

```bash
npx wrangler dev
```

Open `http://localhost:8787`.

## Cloudflare D1 setup

The repository migrations are ordered and safe for a fresh database:

```bash
npx wrangler d1 execute tuition-platform-db --remote --file=migrations/0001_initial.sql
npx wrangler d1 execute tuition-platform-db --remote --file=migrations/0002_reports_logs.sql
npx wrangler d1 execute tuition-platform-db --remote --file=migrations/0003_platform_upgrade.sql
```

For the existing production database, do not re-run the initial schema. Only apply a migration that has not already been applied.

Set the admin password as a Cloudflare secret:

```bash
npx wrangler secret put ADMIN_PASSWORD
```

Deploy:

```bash
npx wrangler deploy
```

## Features

- Public search, tuition type filter, salary sorting and featured ordering
- Bangla/English homepage toggle and mobile bottom navigation
- Safety notice, report flow, privacy, terms, robots and sitemap
- Admin tuition create, publish/hide, feature/unfeature and delete
- Admin media account creation and enable/disable moderation
- Admin reports, report resolution and activity logs
- Media agency login, profile edit, own tuition create/list/delete
- Media-specific commission and branding fields
- Expiry-aware public listing visibility
- Hashed media passwords and hashed session tokens
- Existing D1 data preserved during additive upgrades

## GitHub Actions

For automatic Cloudflare deployment, add these repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Never commit real secrets, `.dev.vars`, or tokens. Rotate any token that has been exposed.
