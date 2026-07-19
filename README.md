# # TeamAppWdd430 - CardVault

A web application for cataloging and tracking trading card collections — including quantity, condition, and estimated value.

## Team Members
* Sebastian Sosa
* Franco Ermacora (Week 3 Group Leader)

---

## Architecture & Design Planning

### Data Model
* **Users**
  * `id`: String (Primary Key)
  * `email`: String (Unique)
  * `username`: String
* **CollectionCard**
  * `id`: UUID / Serial (Primary Key)
  * `userId`: String (Foreign Key -> Users.id)
  * `cardId`: String (External TCG API ID)
  * `name`: String
  * `setName`: String
  * `rarity`: String
  * `quantity`: Integer
  * `condition`: String (NM, LP, MP, HP)
* **WishlistCard**
  * `id`: UUID / Serial (Primary Key)
  * `userId`: String (Foreign Key -> Users.id)
  * `cardId`: String
  * `name`: String
  * `setName`: String
  * `priority`: String (High, Medium, Low)
  * `targetQuantity`: Integer

**Relationships:**
* One User has many CollectionCards.
* One User has many WishlistCards.

### Design Theme & Branding
* **Visual Concept:** Modern dark "vault" aesthetic for premium card tracking.
* **Color Palette (Tailwind):**
  * Background: Dark Neutral (`bg-zinc-950`)
  * Cards/Containers: Textured Dark Grey (`bg-zinc-900`, `border-zinc-800`)
  * Accent / Primary: Mystic Violet (`bg-violet-600`, `hover:bg-violet-500`)
  * Text Primary: Crisp White (`text-zinc-50`)
  * Text Muted: Light Grey (`text-zinc-400`)
* **Typography:** `Geist Sans` or `Inter` for optimal legibility of data tables.
* **Layout & Spacing:** Strict Tailwind grid system (`grid-cols-1 md:grid-cols-3`) for fully responsive desktop and mobile viewports.
