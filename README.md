TeamAppWdd430 - CardVault
A web application for cataloging and tracking trading card game (TCG) collections and wishlists.

Team Members
Sebastian Sosa

Franco Ermacora (Leader)

Live Demo
https://team-app-wdd430-amber.vercel.app

Project Overview
CardVault helps TCG collectors and casual players organize the cards they own and track the cards they want to acquire, replacing spreadsheets with a clean, centralized dashboard. Users authenticate with Clerk, then manage independent modules: a public Master Database to explore and add cards, a personal card Collection, and a Wishlist.

Product Demo Summary
CardVault is an innovative web application designed to solve the common fragmentation and organization challenges faced by trading card game (TCG) enthusiasts and collectors. Managing a physical or digital collection often involves cumbersome spreadsheets or scattered notes to track owned cards, market values, and wanted items. CardVault addresses this problem by providing a centralized, all-in-one digital platform where users can seamlessly build, track, and organize their entire card inventory, manage a personal wishlist, and explore a comprehensive master database.

The platform is primarily intended for TCG players, digital collectors, and hobbyists who want a sleek, intuitive, and modern interface to manage their assets. Whether users are looking to catalog their rare pulls, track card values and images, or plan future acquisitions, CardVault offers the right toolset. The integration of a public master database also allows newcomers and experienced collectors alike to discover new cards and instantly add them to their personal vaults with a single click.

The most important user flow begins on the Master Database page, where users can browse or search through a vast catalog of cards styled with classic TCG aesthetics. From there, users can seamlessly add items directly into their personal Collection or Wishlist, complete with their respective images and card values. Once added, users can navigate to their Dashboard or Wishlist views to manage or clean up items using fully implemented CRUD operations. This smooth client-server workflow delivers a responsive, engaging experience, providing absolute control over their collection.

Tech Stack
Framework: Next.js (App Router)

Language: TypeScript

Styling: Tailwind CSS

Auth: Clerk

Database: PostgreSQL (via Prisma ORM)

Deployment: Vercel

Data Model
User
id: String (Primary Key)

clerkId: String

email: String (Unique)

CollectionCard
id: String (Primary Key)

userId: String (Foreign Key -> User.id)

name: String

set: String

rarity: String

image: String (Asset reference / path)

cardValue: Float

WishlistCard
id: String (Primary Key)

userId: String (Foreign Key -> User.id)

name: String

set: String

rarity: String

image: String (Asset reference / path)

cardValue: Float

Relationships
One User has many CollectionCard records.

One User has many WishlistCard records.

Design Theme & Branding
Visual Concept: Modern dark "vault" aesthetic with classic TCG card styling (amber borders, custom rarity tags).

Color Palette (Tailwind):

Background: bg-zinc-950

Cards/Containers: bg-zinc-900, border-zinc-800

Accent / Primary: bg-violet-600, hover:bg-violet-700

Text Primary: text-white / text-zinc-50

Text Muted: text-zinc-400

Layout: Responsive Tailwind grid (grid-cols-1 sm:grid-cols-2 lg:grid-cols-4) across all main views.

API Routes & Server Actions
Collection Actions
addCollectionCard — safely handles public master database inserts including image assets and card value.

deleteCollectionCard — removes a card from the collection.

Wishlist Actions
addWishlistCard — adds items to the wishlist with image and card value attributes.

deleteWishlistCard — removes items from the wishlist.

Setup & Local Development
Clone the repository:
git clone https://github.com/franco-ermacora/TeamAppWdd430.git
cd TeamAppWdd430

Install dependencies:
npm install

Create a .env.local file with the following variables:
DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

Run database migrations (Prisma):
npx prisma generate
npx prisma db push

Start the development server:
npm run dev

Open http://localhost:3000

Deployment
The application is deployed on Vercel at: https://team-app-wdd430-amber.vercel.app

Access Instructions (for grading)
Open the Master Database page and browse cards freely without restrictions.

Click to add a card to your Collection or Wishlist (ensuring images and values are correctly tracked).

Sign in using Clerk if prompted, then verify that items populate correctly in your Dashboard or Wishlist views.

Test filtering/search controls and full CRUD operations.

Known Issues / Opportunities
No heavy input validation libraries used; relies on native form validation and server-side checks.

Card database is built locally via curated master data rather than a live third-party external TCG API.
