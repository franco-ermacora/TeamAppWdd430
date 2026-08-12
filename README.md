# TeamAppWdd430 - CardVault

A web application for cataloging and tracking trading card game (TCG) collections and wishlists.

## Team Members
- Sebastian Sosa
- Franco Ermacora (Week 3 Group Leader)

## Live Demo
https://team-app-wdd430-amber.vercel.app

---

## Project Overview

CardVault helps TCG collectors and casual players organize the cards they own and track the cards they want to acquire, replacing spreadsheets with a clean, centralized dashboard. Users authenticate with Clerk, then manage two independent modules: a personal card **Collection** and a prioritized **Wishlist**.

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Auth:** Clerk
- **Database:** PostgreSQL (via Prisma ORM)
- **Deployment:** Vercel

---

## Data Model

**User**
- `id`: String (Primary Key)
- `clerkId`: String
- `email`: String (Unique)

**CollectionCard**
- `id`: String (Primary Key)
- `userId`: String (Foreign Key -> User.id)
- `name`: String
- `set`: String
- `rarity`: String
- `quantity`: Integer

**WishlistCard**
- `id`: String (Primary Key)
- `userId`: String (Foreign Key -> User.id)
- `name`: String
- `set`: String
- `rarity`: String
- `priority`: Integer (1 = Low, 2 = Medium, 3 = High)

**Relationships**
- One `User` has many `CollectionCard` records.
- One `User` has many `WishlistCard` records.

---

## Design Theme & Branding

- **Visual Concept:** Modern dark "vault" aesthetic for premium card tracking.
- **Color Palette (Tailwind):**
  - Background: `bg-zinc-950`
  - Cards/Containers: `bg-zinc-900`, `border-zinc-800`
  - Accent / Primary: `bg-violet-600`, `hover:bg-violet-700`
  - Text Primary: `text-white` / `text-zinc-50`
  - Text Muted: `text-zinc-400`
- **Layout:** Responsive Tailwind grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`) across all main views.

---

## API Routes

**Collection**
- `GET /api/collection` — list the authenticated user's collection
- `POST /api/collection` — add a card to the collection
- `PUT /api/collection/[id]` — update card quantity
- `DELETE /api/collection/[id]` — remove a card

**Wishlist**
- `GET /api/wishlist` — list the authenticated user's wishlist
- `POST /api/wishlist` — add a card to the wishlist
- `PUT /api/wishlist/[id]` — update a wishlist card
- `DELETE /api/wishlist/[id]` — remove a card from the wishlist

---

## Setup & Local Development

1. Clone the repository:
```bash
   git clone https://github.com/franco-ermacora/TeamAppWdd430.git
   cd TeamAppWdd430
```
2. Install dependencies:
```bash
   npm install
```
3. Create a `.env.local` file with the following variables:

DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

4. Run database migrations (Prisma):
```bash
   npx prisma generate
   npx prisma db push
```
5. Start the development server:
```bash
   npm run dev
```
6. Open [http://localhost:3000](http://localhost:3000)

---

## Deployment

The application is deployed on Vercel at:
https://team-app-wdd430-amber.vercel.app

Environment variables are configured in the Vercel project settings, matching `.env.local`.

---

## Access Instructions (for grading)

- Sign in / sign up using Clerk (no demo credentials — create your own account via the sign-up flow).
- After signing in:
  1. Go to the Collection Dashboard, add a card, and confirm it appears.
  2. Use the search/filter controls (rarity/set) and confirm the URL updates.
  3. Go to the Wishlist page, add a card with a priority level, and confirm the priority badge appears.
  4. Edit or delete an item in either view to confirm update/delete functionality.

---

## Known Issues / Opportunities

- No input validation library is used yet — only basic manual checks on required fields.
- No automated tests have been written yet (manual end-to-end testing only).
- Card data is entered manually; no integration with an external TCG card database/API yet.
- Estimated value tracking (mentioned in early planning) is not yet implemented.