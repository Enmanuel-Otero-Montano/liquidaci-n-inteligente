# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Liquidación Inteligente is a marketplace platform for liquidation sales in Uruguay. It connects sellers with buyers for discounted product listings, with an admin moderation layer. Built with Lovable (AI app builder) and uses Spanish for UI text and route paths.

## Commands

```bash
npm run dev          # Dev server on port 8080
npm run build        # Production build (Vite)
npm run build:dev    # Development build
npm run lint         # ESLint
npm run preview      # Preview production build
npm test             # Run tests once (Vitest)
npm run test:watch   # Tests in watch mode
```

## Tech Stack

- **Framework:** React 18 + TypeScript + Vite (SWC plugin)
- **Styling:** Tailwind CSS with CSS variables, shadcn/ui components (Radix UI primitives)
- **State:** TanStack React Query for server state, React Context for auth
- **Forms:** React Hook Form + Zod validation
- **Backend:** Supabase (auth, PostgreSQL database, RPC functions, storage)
- **Testing:** Vitest + Testing Library + jsdom
- **Routing:** React Router v6

## Architecture

### Three User Roles

1. **Public (buyers)** — Browse catalog, view products, make reservations, subscribe to newsletter
2. **Sellers (`/vendedor/*`)** — Manage products, handle reservations, view dashboard stats
3. **Admins (`/admin/*`)** — Moderate products, manage sellers, view reports

### Provider Hierarchy (App.tsx)

```
QueryClientProvider → AuthProvider → AdminAuthProvider → TooltipProvider → BrowserRouter
```

### Authentication

- **AuthContext** (`src/contexts/AuthContext.tsx`): Seller auth via Supabase Auth. Provides `user`, `seller` (profile from DB), `login`, `register`, `logout`, `refreshSeller`.
- **AdminAuthContext** (`src/contexts/AdminAuthContext.tsx`): Admin auth. Validates admin role via Supabase RPC `has_role('admin')`.
- Protected routes use `<ProtectedRoute>` (sellers) and `<AdminProtectedRoute>` (admins) wrapper components.

### Data Fetching Pattern

Custom hooks in `src/hooks/` wrap TanStack React Query:
- Queries use `staleTime` caching (categories/locations: 1hr, products/stats: 5min, reservations: 2min)
- Mutations invalidate related query keys on success (e.g., product mutation invalidates `['products']` and `['dashboard-stats']`)
- All Supabase calls go through the client at `src/integrations/supabase/client.ts`

### Database Tables (via Supabase)

`products`, `sellers`, `reservations`, `moderation_history`, `seller_actions`, `reports`

Key RPC functions: `generate_slug` (product URLs), `has_role` (admin check)

### Route Structure

- Public: `/`, `/liquidaciones`, `/p/:slug`, `/reserva-ok`, `/suscribirme`, `/terminos`, `/privacidad`, `/ayuda`
- Seller: `/vendedor/login`, `/vendedor/registro`, `/vendedor` (dashboard), `/vendedor/productos`, `/vendedor/productos/nuevo`, `/vendedor/productos/:id/editar`, `/vendedor/reservas`, `/vendedor/perfil`
- Admin: `/admin/login`, `/admin/moderacion`, `/admin/vendedores`, `/admin/reportes`

### Path Aliases

`@/` maps to `src/` — use `@/components`, `@/hooks`, `@/lib`, `@/types`, `@/contexts`, etc.

### Styling

- shadcn/ui with `components.json` config (base color: slate, CSS variables enabled, no RSC)
- Add new shadcn components via: `npx shadcn-ui@latest add <component>`
- Custom semantic color tokens in `src/index.css`: `--primary` (emerald), `--accent` (coral), plus `discount-badge`, `seller-section`, `catalog-primary`, etc.
- Dark mode supported via `next-themes` with `dark` class selector
- Utility function `cn()` from `@/lib/utils` for merging Tailwind classes

### Key Product Features

- Product approval workflow: `pending` → `approved`/`rejected`/`changes_requested`
- Quantity promotions: 2x1, 3x2, pack pricing, quantity discounts
- Multi-image upload (max 5)
- Delivery options: pickup, shipping, or both
- Slug-based product URLs (`/p/:slug`)

### Type Definitions

All in `src/types/` — `product.ts`, `seller.ts`, `admin.ts`, `dashboard.ts`, `moderation.ts`, `reservation.ts`, `productForm.ts`, `lead.ts`, `subscription.ts`. Supabase auto-generated types in `src/integrations/supabase/types.ts`.

### Testing

Config in `vitest.config.ts`. Setup file at `src/test/setup.ts`. Tests use `jsdom` environment and match `src/**/*.{test,spec}.{ts,tsx}`.
