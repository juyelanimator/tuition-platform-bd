# Tuition Platform BD

Cloudflare Workers + D1 ভিত্তিক premium tuition listing platform. Public visitor website, admin authentication, D1 schema, search/filter, details, phone/WhatsApp contact এবং report flow included.

## Local development

```bash
npx wrangler dev
```

Open `http://localhost:8787`.

## Cloudflare D1 setup

1. `npx wrangler login`
2. Create the database: `npx wrangler d1 create tuition-platform-db`
3. Copy the returned `database_id` into `wrangler.toml`.
4. Apply schema and demo data:

```bash
npx wrangler d1 migrations apply tuition-platform-db --remote
npx wrangler d1 execute tuition-platform-db --remote --file=seed.sql
```

5. Set the admin password as a secret:

```bash
npx wrangler secret put ADMIN_PASSWORD
```

6. Deploy:

```bash
npx wrangler deploy
```

## GitHub

```bash
git add .
git commit -m "Rebuild Tuition Platform BD on Cloudflare D1"
git remote add origin https://github.com/YOUR_USERNAME/tuition-platform-bd.git
git push -u origin main
```

Never commit real secrets, `.dev.vars`, or the D1 database id if you prefer managing it through CI variables. For GitHub Actions deployment, add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets, then use Wrangler in a workflow.

## Blueprint decisions implemented

- Visitor does not need an account and contacts via phone/WhatsApp only.
- Admin password is environment-secret based; media accounts are admin-created (API expansion ready).
- Published listings expire through `expires_at`; reports and activity-log tables are included.
- Media branding and commission fields are modeled at the database level.

## Before production

Add full admin/media CRUD UI, password hashing for media accounts, rate limiting, logo storage (R2), scheduled expiry cleanup, backups, and final decisions for commission calculation, featured duration, agency deletion confirmation, and location privacy.
