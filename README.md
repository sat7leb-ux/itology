# ITOLOGY

IT services + technology e-commerce platform. Next.js (App Router) + TypeScript + Tailwind on the frontend, Supabase (Postgres, Auth, Storage) on the backend.

This is the **Phase 1–2 scaffold**: project structure, design system, Supabase schema, storefront pages (homepage, shop, category, product), and an admin portal skeleton (dashboard, products, categories, plus stub pages for the remaining modules). Cart persistence, checkout, and full CRUD across every admin module are Phase 3–4 (see `docs` section below and the master architecture doc).

## Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide icons
- **Backend:** Supabase (Postgres + Auth + Storage + Row Level Security)
- **Payments:** Stripe (integration point scaffolded, not yet wired — see `.env.example`)
- **Deployment:** Vercel (frontend), Supabase (database)

## Getting started

```bash
npm install
cp .env.example .env.local
# fill in NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY / SUPABASE_SERVICE_ROLE_KEY
npm run dev
```

### Database setup

1. Create a project at [supabase.com](https://supabase.com).
2. Run the migration in `supabase/migrations/0001_init.sql` (paste into the SQL editor, or via the Supabase CLI: `supabase db push`).
3. Optionally run `supabase/seed.sql` for placeholder demo data (a few categories, brands, services, and two sample products) so the storefront isn't empty during development.
4. Copy your project URL and keys into `.env.local`.
5. Once the schema is stable, generate real TypeScript types to replace the `Database = any` placeholder in `lib/types.ts`:
   ```bash
   npx supabase gen types typescript --project-id <your-project-id> > lib/database.types.ts
   ```

### Admin access

`user_roles.role` controls admin/staff access (see the RLS policies in the migration). After creating your first Supabase Auth user, insert a row manually:

```sql
insert into user_roles (user_id, role) values ('<your-auth-user-id>', 'admin');
```

`app/admin/layout.tsx` has a `TODO` marking where the route-level auth guard belongs — add it once you've decided on the auth flow (magic link vs. password).

## Project structure

```
app/
  (site)/            Public storefront — has its own layout (header + footer)
    page.tsx          Homepage
    shop/              Category grid, category listing, product detail
    services/          IT Services
    cart/, account/
  admin/              Admin portal — separate layout (sidebar, no public chrome)
    products/, categories/, brands/, attributes/, orders/, customers/,
    reviews/, promotions/, media/, services/, content/, settings/
  layout.tsx          Root layout: fonts + metadata only
  globals.css
components/           Shared UI (header, footer, product card, admin sidebar, ...)
lib/
  data.ts             Server-side data-fetching functions (Server Components)
  supabase/           Browser, server, and admin (service-role) Supabase clients
  types.ts            Domain types — swap for generated Supabase types when ready
supabase/
  migrations/0001_init.sql   Full schema + RLS policies
  seed.sql                    Placeholder demo data
```

## Design system

- **Palette:** `ink` (#10171A, dark marketing/header/footer surfaces), `paper` (#F2F4F3, catalog surfaces), `jade` (#1C9C8E, primary accent), `amber` (#E8A33D, sale/status only).
- **Type:** Space Grotesk (display/headlines), IBM Plex Sans (body/UI), IBM Plex Mono (SKUs, spec values — functional use, not decorative).
- Tokens live in `tailwind.config.ts`.

## What's next (not yet built)

- Cart persistence (`carts`/`cart_items` tables exist; no client-side cart state or server actions yet)
- Stripe checkout flow
- Product variant builder + media library upload UI in admin
- Auth flow (sign in/up pages) and the admin route guard
- Full CRUD for brands, attributes, orders, customers, reviews, promotions, services, and content — `categories` and `products` (create) are built out as the reference pattern
- Search, wishlist, and compare functionality
- SEO metadata pass per page, sitemap, structured data for products

See the research & architecture document delivered earlier in this project for the full competitive research, brand rationale, and phased plan.
