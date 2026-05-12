# Knytkalas

A handmade RESTful API for organizing potluck dinners; saving sanity by coordinating guests, dietary restrictions, contributions, and events.

Built with Node.js, Express, TypeScript, and MongoDB with Mongoose.

## Installation

Want to try it out? Be my guest!

### Prerequisites

- Node.js (v18 or later)
- A MongoDB database

1. Clone the repository

```bash
git clone https://github.com/LinneaToth/knytkalas.git
cd knytkalas
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root of the project with the following:

```
MONGODB_URI=your_mongodb_connection_string
PORT=3000
NODE_ENV=development
```

## Running the project

**Development** (auto-restarts on save):

```bash
npm run dev
```

The server will be available at `http://localhost:3000`.

## Seeding the database

To populate the database with mock data for development:

```bash
npx tsx src/seeds/seeds.ts
```

> **Warning:** This will overwrite any existing data in the events, users, and invites collections in any database you may have with this name.

## Implemented API Endpoints

| Method | Endpoint                          | Description                              |
| ------ | --------------------------------- | ---------------------------------------- |
| GET    | `/api/events`                     | Get all events                           |
| GET    | `/api/events/:id`                 | Get a specific event                     |
| GET    | `/api/events/:id/contributions`   | Get all contributions for an event       |
| GET    | `/api/events/search?host=<id>`    | Get all events hosted by a specific user |
| GET    | `/api/invites`                    | Get all invites                          |
| GET    | `/api/users`                      | Get all users                            |
| POST   | `/api/invites`                    | Create a new invite                      |
| POST   | `/api/users`                      | Create a new user                        |
| DELETE | `/api/invites/:id`                | Delete a specific invite                 |
| PATCH  | `/api/invites/edit-contributions` | WIP - Update contributions on an invite  |
