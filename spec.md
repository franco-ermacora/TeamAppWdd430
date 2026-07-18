# CardVault — Project Specification

## Title & Description
CardVault is a web application for cataloging and tracking trading card collections, allowing users to record quantity, condition, and estimated value of each card.

## Purpose & Target Audience
Trading card collectors and hobbyists who want a simple digital way to organize their collection and track its value over time.

## User Stories

1. As a user, I want to sign up and log in, so that my collection is saved to my account.
   - Acceptance criteria: User can register with email/password; user can log in and log out; sessions persist.

2. As a user, I want to add a new card to my collection, so that I can start tracking it.
   - Acceptance criteria: User can input card name, set/edition, condition, quantity, and estimated value; card is saved and appears in their collection list.

3. As a user, I want to view my full collection, so that I can see everything I own.
   - Acceptance criteria: Collection displays as a list/grid with key details (name, condition, value); total collection value is calculated and shown.

4. As a user, I want to edit a card's details, so that I can update its condition or value.
   - Acceptance criteria: User can open a card, modify fields, and save changes; updated data reflects immediately in the collection view.

5. As a user, I want to delete a card from my collection, so that I can remove cards I no longer own.
   - Acceptance criteria: User can delete a card with a confirmation step; card is removed from the list and database.

## API Endpoints (planned)
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/cards` — list user's cards
- `POST /api/cards` — create a card
- `PUT /api/cards/:id` — update a card
- `DELETE /api/cards/:id` — delete a card

## Implementation Priority
1. Auth (sign up / log in)
2. Create & view cards
3. Edit cards
4. Delete cards
5. Collection value summary