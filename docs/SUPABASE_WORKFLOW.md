# Supabase Workflow (Repo-Driven Database)

This repo is configured to manage your Supabase database schema with the Supabase CLI. The cloud project is the current source of truth (pull-first), and future changes are made via migrations (push).

- Project ref: `kkavyqtcvobrzlcztbpj`
- CLI docs: https://supabase.com/docs/guides/cli

## Folder Structure

- `supabase/config.toml` — CLI config
- `supabase/migrations/` — SQL migrations (immutable, ordered)
- `supabase/seed.sql` — Non-destructive seed placeholder
- `src/lib/supabase/types.gen.ts` — (optional) Generated TypeScript types

## Safety Rules

- Do NOT commit secrets. Keep `.env` and `.env.*` out of git. Only `.env.example` is committed.
- Do NOT include `service_role` key anywhere in the repo.
- Do NOT make schema changes in the dashboard except emergencies. Always use migrations.
- Migrations are the source of truth. Never edit an existing migration after it is merged.
- Keep SQL migrations additive and safe. Avoid destructive changes (DROP/TRUNCATE) unless explicitly planned.
- If you must run unsafe commands (e.g., `DROP INDEX CONCURRENTLY`), document in a separate runbook step and run manually.

## Environment

Create a `.env` at repo root (never commit it):

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
SUPABASE_PROJECT_REF=kkavyqtcvobrzlcztbpj
```

## Install Supabase CLI

Follow the official installation for your OS:
- https://supabase.com/docs/guides/cli/getting-started#installation

Verify:
```bash
supabase --version
```

## Pull-First Workflow (Capture existing cloud schema)

Use this when you want to import your current live database into version control.

```bash
# 1) Authenticate
supabase login

# 2) Link this repo to the cloud project
npm run supabase:link
# (equivalent to: supabase link --project-ref $SUPABASE_PROJECT_REF)

# 3) Pull schema and generate migrations from cloud
npm run supabase:pull
# (equivalent to: supabase db pull)

# 4) Review and commit generated migrations
git add supabase/migrations
git commit -m "chore: pull schema from cloud"
```

Notes:
- `supabase db pull` will create migration files for differences. Review the SQL for safety before committing.

## Push Workflow (Apply new migrations to cloud)

Use this when you’ve created new migrations locally that you want to apply to the cloud project.

```bash
# 1) Create a new migration file (example)
supabase migration new add_user_table
# edit the generated SQL under supabase/migrations/*_add_user_table.sql

# 2) Test locally (optional)
npm run supabase:start
# apply migrations to local stack automatically
npm run supabase:status

# 3) Push to cloud when ready
npm run supabase:push
# (equivalent to: supabase db push)

# 4) Stop local stack (optional)
npm run supabase:stop
```

Rules:
- Migrations are immutable. If a migration is wrong, add a new corrective migration.
- Avoid destructive changes; consider using `ALTER` operations that are reversible.

## Seed Data (Non-destructive)

Use `supabase/seed.sql` for safe inserts. Keep it idempotent with `WHERE NOT EXISTS` patterns.

Apply locally during dev:
```bash
# Start local stack and apply migrations
npm run supabase:start
# Then manually run seed in SQL editor or psql shell against local DB
# Example (psql): \i supabase/seed.sql
```

## Types Generation (Optional)

Generate TypeScript types from your database schema for safer client code.

```bash
npm run supabase:gen-types
# Output: src/lib/supabase/types.gen.ts
```

Notes:
- This requires `SUPABASE_PROJECT_REF` to be set in `.env`.
- Do not commit secrets. The command does not require the service_role key.

## Local Dev: Start/Stop/Status

```bash
npm run supabase:start   # start local Docker stack
npm run supabase:status  # check service status
npm run supabase:stop    # stop Docker stack and free ports
```

## Troubleshooting

- If `supabase db pull` shows no changes: your local migrations already match cloud.
- If `supabase db push` fails: check for unsafe SQL or missing privileges. Fix by editing the new migration and retry.
- If Docker ports conflict: edit `supabase/config.toml` (API and DB ports) or stop other services.

---

## Runbook (Copy/Paste)

```bash
# One-time setup
supabase login
npm run supabase:link

# Pull-first (capture cloud → repo)
npm run supabase:pull
git add supabase/migrations
git commit -m "chore: pull schema from cloud"

# Create a new migration
supabase migration new add_table_example
# edit supabase/migrations/*_add_table_example.sql

# Test locally
npm run supabase:start
npm run supabase:status
# (optional) apply seed: open local SQL shell and run \i supabase/seed.sql

# Push new migrations to cloud
npm run supabase:push

# Generate types (optional)
npm run supabase:gen-types

# Stop local
npm run supabase:stop
```
