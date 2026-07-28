# Project Specification Framework - CardVault

## Project Title & Description
**CardVault - TCG Collection & Wishlist Tracker**
CardVault is a full-stack web application designed for collectors of trading card games (TCGs) who need to digitally manage their personal collections of physical cards and keep track of their wishlists. Built on Next.js, it provides a clean interface where users can organize their cards, check quantities, and log missing pieces they wish to acquire next.

## Purpose & Target Audience
- **Audience:** Collectors and active players of trading card games (TCGs) who need a quick and accessible tool on the go.

- **Purpose:** To solve the common problem collectors face of not accurately remembering which unique cards they already own and which they are missing while buying or trading at events, thus preventing accidental duplicate purchases or missed trading opportunities.

## User Stories (CardVault Specifics)
1. As a collector, I want to register and log in securely to keep my card inventory private and persistent.

2. As a user, I want to see a main dashboard with all the cards I own (Read) and be able to add new cards with details such as name, set, rarity, and quantity (Create/Update/Delete).

3. As a buyer, I want to manage a separate view (Wishlist) to list the cards I want to acquire, be able to perform full CRUD operations, and assign priorities.

4. As a mobile user, I want to access the platform from my phone in a card shop and quickly filter my collection by Set or Rarity to instantly check my stock.

## Acceptance Criteria
- **Given** an authenticated collector, **when** they access the Collection Dashboard or the Wishlist, **then** the system must isolate their data logs so they only see their own cards and not those of other users.

- **Give** the form to add or modify a card; **when** the quantity entered is less than 1 or required fields are left blank, **then** the interface should block submission and display a visual validation error.

- **Give** a change to the URL search parameters (`searchParams`); **when** the user filters by Set or Rarity, **then** the application should perform an instant partial navigation, updating only the card list without reloading the entire page.

## Technical Requirements
- **Framework:** Next.js (App Router).

- **Language:** TypeScript configured in strict mode.

- **Styling:** Tailwind CSS (utility approach, native dark palette: `bg-zinc-950`, `bg-zinc-900`, accents on `bg-violet-600`).

- **Authentication:** Clerk or Auth.js for secure and persistent user sessions.

- **Data Architecture:** PostgreSQL (Neon) or Supabase as the native relational database with structured API endpoints in Next.js (`/api/collection` and `/api/wishlist`).

- **Component Architecture:** React Server Components (RSC) by default for efficient initial rendering of card lists, delegating interactive client states (`useSearchParams`, interactive forms) to specific Client Components.

## Implementation Priority (Milestones)

### P0 (Critical MVP - Week 4 Milestone)
- Initialization of the clean Next.js project, configuration of environment variables, and Tailwind CSS.

- Deployment of the relational data tables (`Users`, `CollectionCard`, `WishlistCard`) to Postgres.

- Full integration of the user authentication system (Clerk/Auth.js).

### P1 (Core Enhancements - Week 5 Milestone)
- Development of complete API routes for CRUD inventory management (`/api/collection` and `/api/collection/[id]`).

- Development of complete API routes for CRUD wishlist management (`/api/wishlist`).

### P2 (UI & UX - Week 6 Milestone)
- Layout of the Collection Dashboard and Wishlist view with full responsive support (Mobile & Desktop).

- Implementation of advanced filter logic and state persistence using `searchParams` in the URL.

- Design of optimized loading states (`loading.tsx` / skeletons) for server data calls.
