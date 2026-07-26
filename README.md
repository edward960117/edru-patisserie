# BLUE ISLET

Modern storefront and admin experience for BLUE ISLET, built with Next.js App Router, React 19, TypeScript, Tailwind CSS v4, and Prisma.

## Current Tech Stack

- Framework: Next.js 15 App Router
- UI: React 19
- Language: TypeScript 6
- Styling: Tailwind CSS v4 via PostCSS plugin
- Data: Prisma ORM with Neon PostgreSQL
- Linting: ESLint (next/core-web-vitals via Next lint)

## Project Structure

- [app](app): App Router pages, layouts, route handlers, and API endpoints
- [components](components): Reusable UI components
- [lib](lib): Shared utilities, auth helpers, i18n, Prisma client, and validation
- [prisma](prisma): Prisma schema and seed script
- [data](data): Content JSON used by the app
- [public](public): Static assets
- [middleware.ts](middleware.ts): Request middleware
- [next.config.ts](next.config.ts): Next.js configuration
- [postcss.config.js](postcss.config.js): PostCSS with Tailwind v4 plugin
- [app/globals.css](app/globals.css): Global styles and Tailwind import

## Getting Started

1. Install dependencies.
2. Create a local .env file (you can start from .env.example).
3. Run Prisma generate (automatic on postinstall) and sync the database.
4. Start the development server.

Commands:

- npm install
- npm run db:push
- npm run db:seed
- npm run dev

The app runs at http://localhost:3000.

## Available Scripts

- npm run dev: Start Next.js in development mode
- npm run build: Create a production build
- npm run start: Run the production server
- npm run lint: Run Next.js ESLint checks
- npm run db:push: Push Prisma schema to the database
- npm run db:deploy: Apply Prisma migrations in deploy environments
- npm run db:seed: Seed database content

## Environment Variables

Set these in .env for local development and in your hosting environment:

- DATABASE_URL
- DIRECT_URL
- NEON_REST_API_URL

Example values are documented in [.env.example](.env.example).

## Notes

- Tailwind v4 is enabled through [postcss.config.js](postcss.config.js) and imported in [app/globals.css](app/globals.css).
- Linting currently uses ESLint with [.eslintrc.json](.eslintrc.json).
- Oxlint config exists in [.oxlintrc.json](.oxlintrc.json), but the active lint script runs Next lint.
- Cake image uploads are compressed server-side to thumbnail-sized WebP before database save to improve mobile page load speed.
