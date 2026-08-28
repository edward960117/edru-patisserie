# Blue Islet Copilot Instructions

This repository is a Next.js storefront and admin app for Blue Islet. Keep every change aligned with the app’s existing patterns and business workflows.

## Project context
- Stack: Next.js App Router, TypeScript, Prisma, Stripe, localized storefront/admin UI.
- This app has both customer-facing pages and staff-only admin flows.
- Preserve the existing design language, localization split between English and Chinese, and the current component structure.
- Prefer small, targeted edits over large refactors.

## Core rules for all work
- Follow the current app folder structure in app, components, and lib instead of creating unnecessary abstractions.
- Reuse existing utilities and patterns before introducing new ones.
- Keep frontend behaviors and API/server logic synchronized.
- Match the existing class names, styling tokens, and layout conventions.
- Before changing checkout or payment behavior, check both the admin toggles and the server-side visibility logic together.

## Checkout and payment rules
- Payment settings must be treated as user-controlled configuration, not just environment-only flags.
- Stripe visibility on the checkout page must depend on both: Stripe being configured and the admin setting being enabled.
- When editing payment settings, update the persisted settings model, the admin form, the API route, and the checkout rendering logic in the same change.
- When toggling a payment option in admin, keep the state and server persistence in sync.
- Never hide Stripe in the admin UI without also ensuring the checkout page respects the same setting.

## Admin workflow rules
- Admin features should keep client state and server persistence consistent.
- When the database is unavailable, keep the admin fallback behavior intact instead of introducing hard failures.
- For every state-changing admin action, verify both the UI state and the backend response flow.

## Frontend quality bar
- Preserve responsive behavior and accessible interactions.
- Keep customer-facing copy and admin copy localized to the active language.
- Do not add new libraries or patterns unless the project already uses them or the task clearly requires them.

## Validation expectations
- Run the smallest relevant validation before claiming the work is complete.
- For checkout/payment changes, verify the admin setting, the API update, and the checkout screen together.
- If a change affects rendering or state, prefer a focused build or TypeScript check rather than broad churn.

## Skill usage
- Copilot should discover the Microsoft Agent Skills repo through the local .github/skills folder.
- Use those skills selectively, especially for frontend review, architecture guidance, and workflow issues.
- Do not load broad Azure or enterprise skill content for routine Next.js app work unless the task actually requires it.
