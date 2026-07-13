# StudyBuddy - Project Specification

## Project Title & Description
StudyBuddy is a web application designed specifically for BYU-Idaho students to find, join, and organize study groups for their current courses. The platform eliminates scattered social media chats by centralizing study sessions around formal course codes, enabling effective collaboration aligned with the BYU-I Learning Model.

## Purpose & Target Audience
- **Audience:** BYU-Idaho students looking for peer support, group accountability, and collaborative learning environments.
- **Purpose:** Facilitate academic success and spiritual fellowship by simplifying how students connect based on their shared schedules and current class enrollment.

## User Stories
1. As a student, I want to create an account using my university credentials so that I can securely participate in study groups.
2. As a student, I want to browse study groups by course code (e.g., WDD 430) so that I can quickly find help for my specific classes.
3. As a group organizer, I want to create a new study group with a specific focus, location, and time so that other classmates can join.
4. As a member of a group, I want to RSVP to an upcoming study session so that the organizer knows how many people to expect.
5. As a group organizer, I want to post and update weekly meeting schedules so that all members stay informed.

## Acceptance Criteria

### Story 1: Account Creation
- **Given** a new user, **when** they submit a valid email and strong password, **then** the system provisions a user profile and logs them in.
- **Given** an invalid input form, **when** the form is submitted, **then** the UI displays validation errors and blocks network submission.

### Story 2: Filter Groups by Course
- **Given** an authenticated student on the dashboard, **when** they enter a course prefix, **then** the system dynamically filters and lists matching active groups.
- **Given** a search query with no matches, **when** submitted, **then** the interface presents an empty-state message offering to create a new group.

### Story 3: Create a Study Group
- **Given** an organizer, **when** they complete the group creation form with valid details, **then** a new entity is persisted and the user is redirected to the group details view.

## Technical Requirements
- **Framework:** Next.js (App Router)
- **Language:** TypeScript configured in strict mode (`noImplicitAny: true`)
- **Styling:** Tailwind CSS (utility-first approach, no external global CSS custom layers)
- **Data Architecture:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js / Clerk for session management
- **Component Architecture:** React Server Components (RSC) by default; Client Components used exclusively for interactive elements (forms, filters).

## Core API Endpoints
- `GET /api/groups` - Fetch all active study groups (supports query filtering by course).
- `GET /api/groups/[id]` - Retrieve specific details and member lists for a group.
- `POST /api/groups` - Provision a new study group entity.
- `POST /api/groups/[id]/join` - Add the authenticated user to a group's roster.
- `POST /api/sessions` - Schedule a new recurring or one-time study event.

## Implementation Priority
- **P0 (Critical Minimum Viable Product):** User authentication, course group browsing, group creation, and join functionality.
- **P1 (Core Enhancements):** Edit group details, automatic email notifications for updates, schedule management.
- **P2 (Nice to Have):** Integrated live group chat, campus interactive map integration for meeting spots.
