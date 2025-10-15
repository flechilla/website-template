# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a **Turborepo monorepo** template using **shadcn/ui** components, built with Next.js 15, React 19, and Tailwind CSS v4. The repository uses **pnpm** as the package manager with workspace configuration.

## Project Structure

```
├── apps/
│   └── web/              # Next.js 15 application
├── packages/
│   ├── db/               # Shared database package with Drizzle ORM (exports to @workspace/db)
│   ├── seo/              # Shared SEO utilities and configuration (exports to @workspace/seo)
│   ├── ui/               # Shared shadcn/ui components (exports to @workspace/ui)
│   ├── eslint-config/    # Shared ESLint configuration
│   └── typescript-config/# Shared TypeScript configuration
```

### Key Architecture Patterns

**Monorepo Package Sharing:**

- The `@workspace/ui` package is the centralized UI component library
- UI components are exported via package.json exports map (components/_, lib/_, hooks/\*)
- The `web` app imports components using workspace protocol: `@workspace/ui/components/button`
- Next.js is configured to transpile the `@workspace/ui` package (see apps/web/next.config.mjs:3)

**shadcn/ui Integration:**

- Components are added at the **root level** targeting the web app: `pnpm dlx shadcn@latest add button -c apps/web`
- This places components in `packages/ui/src/components/` directory (not in apps/web)
- The components.json configuration (apps/web/components.json) defines style="new-york", RSC support, and path aliases
- Global styles are in `packages/ui/src/styles/globals.css` and imported in apps/web/app/layout.tsx:3

**Database Package (@workspace/db):**

- Shared Drizzle ORM package with PostgreSQL support
- Schema files are in `packages/db/src/schema/` directory
- Database client is exported from `@workspace/db/client`
- Type-safe schema exports from `@workspace/db/schema`
- Generated TypeScript types from `@workspace/db/types`
- Requires `DATABASE_URL` environment variable in root `.env` file

**SEO Package (@workspace/seo):**

- Shared SEO utilities and configuration for Next.js 15 applications
- Configuration system with environment variable support
- Type-safe SEO configuration types
- Schema.org constants for structured data
- Exports configuration from `@workspace/seo/config`
- Exports utilities from `@workspace/seo/utils`
- Exports types from `@workspace/seo/types`
- Requires SEO environment variables (see Environment Setup below)

## Development Commands

**Prerequisites:**

- Node.js >=20
- pnpm 10.4.1 (run `pnpm --version` to check)

**Common commands (run from root):**

```bash
# Install dependencies
pnpm install

# Start development server (runs all apps)
pnpm dev

# Build all apps and packages
pnpm build

# Lint all packages
pnpm lint

# Format all code
pnpm format

# Type check (from apps/web)
cd apps/web && pnpm typecheck
```

**App-specific commands (run from apps/web):**

```bash
# Development with Turbopack
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint with auto-fix
pnpm lint:fix

# Type checking
pnpm typecheck
```

**Adding shadcn/ui components:**

```bash
# Always run from repository root
pnpm dlx shadcn@latest add <component-name> -c apps/web

# Example: add button component
pnpm dlx shadcn@latest add button -c apps/web
```

This will add the component to `packages/ui/src/components/`.

**Database commands (run from root):**

```bash
# Generate migrations from schema changes
pnpm --filter @workspace/db db:generate

# Run migrations
pnpm --filter @workspace/db db:migrate

# Push schema changes directly (dev only, skips migrations)
pnpm --filter @workspace/db db:push

# Open Drizzle Studio (database GUI)
pnpm --filter @workspace/db db:studio
```

## Technology Stack

- **Build Tool:** Turborepo 2.5.5 with TUI interface
- **Package Manager:** pnpm with workspace protocol
- **Framework:** Next.js 15.4.5 (App Router, RSC enabled)
- **React:** v19.1.1
- **Database:** PostgreSQL with Drizzle ORM 0.38.3
- **Styling:** Tailwind CSS v4.1.11 (using @tailwindcss/postcss)
- **UI Library:** shadcn/ui (New York style, neutral base color)
- **Icons:** Lucide React
- **Theme:** next-themes for dark mode support
- **TypeScript:** 5.7.3 (root) / 5.9.2 (packages)

## Import Patterns

**Importing UI components in apps/web:**

```tsx
import { Button } from '@workspace/ui/components/button'
import { cn } from '@workspace/ui/lib/utils'
```

**Importing database in apps/web:**

```tsx
import { type NewUser, type User, db } from '@workspace/db/client'
import { users } from '@workspace/db/schema'

// Query example
const allUsers = await db.select().from(users)

// Insert example
const newUser: NewUser = { name: 'John', email: 'john@example.com' }
await db.insert(users).values(newUser)
```

**Importing SEO utilities in apps/web:**

```tsx
import {
    createDefaultSEOConfig,
    getSiteUrl,
    mergeSEOConfig,
} from '@workspace/seo/config'
import type { SEOConfig } from '@workspace/seo/config'

// Create default SEO configuration from environment variables
const seoConfig = createDefaultSEOConfig()

// Get site URL
const siteUrl = getSiteUrl()

// Merge configurations
const customConfig = mergeSEOConfig(seoConfig, {
    siteName: 'My Custom Site',
})
```

**Path aliases (defined in apps/web/components.json):**

- `@/components` → apps/web/components
- `@/hooks` → apps/web/hooks
- `@/lib` → apps/web/lib
- `@workspace/ui/lib/utils` → packages/ui/src/lib/utils.ts
- `@workspace/ui/components` → packages/ui/src/components/
- `@workspace/db/client` → packages/db/src/index.ts
- `@workspace/db/schema` → packages/db/src/schema/index.ts
- `@workspace/db/types` → packages/db/src/types.ts
- `@workspace/seo/config` → packages/seo/src/config/index.ts
- `@workspace/seo/utils` → packages/seo/src/utils/index.ts
- `@workspace/seo/types` → packages/seo/src/types/index.ts

## Environment Setup

Create a `.env` file in the repository root with:

```bash
# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# SEO Configuration
NEXT_PUBLIC_SITE_URL=https://example.com
NEXT_PUBLIC_SITE_NAME="My Website"
NEXT_PUBLIC_SITE_DESCRIPTION="A modern web application built with Next.js"
NEXT_PUBLIC_TWITTER_HANDLE=@yourbrand
NEXT_PUBLIC_FACEBOOK_APP_ID=
NEXT_PUBLIC_LOCALE=en-US
NEXT_PUBLIC_ENABLE_INDEXING=false

# Environment
NODE_ENV=development
```

**Database Environment Variables:**
The `DATABASE_URL` is required for:

- Database migrations (`pnpm --filter @workspace/db db:migrate`)
- Drizzle Kit commands (generate, push, studio)
- Runtime database connections in apps

**SEO Environment Variables:**

- `NEXT_PUBLIC_SITE_URL`: Base URL of your website (no trailing slash)
- `NEXT_PUBLIC_SITE_NAME`: Site name for metadata and title tags
- `NEXT_PUBLIC_SITE_DESCRIPTION`: Default site description
- `NEXT_PUBLIC_TWITTER_HANDLE`: Twitter/X handle (with @ prefix)
- `NEXT_PUBLIC_FACEBOOK_APP_ID`: Facebook App ID (optional)
- `NEXT_PUBLIC_LOCALE`: Default locale (e.g., en-US)
- `NEXT_PUBLIC_ENABLE_INDEXING`: Enable/disable search engine indexing (defaults to true in production)

## Turbo Configuration

The turbo.json defines task dependencies:

- `build` task depends on upstream builds (`^build`)
- `dev` is persistent and never cached
- `lint` and `check-types` have upstream dependencies
- Build outputs go to `.next/**` (excluding cache)
