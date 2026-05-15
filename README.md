# Knytkalas

A handmade RESTful API for organizing potluck dinners; saving sanity by coordinating guests, dietary restrictions, contributions, and events.

Built with Node.js, Express, TypeScript, and MongoDB with Mongoose.

## About

- Manage events (potluck dinners) with host info and timestamps
- Register users with dietary restrictions and invite history
- Send and track invites with RSVP status (accepted / declined / pending)
- Track food/drink contributions per invite, including allergen info

## Data Model

Three MongoDB collections, using a mix of embedded documents and references. Below are some highlights for each, but I'd recommend that you check out my shemas (@ /src/models) if you are curious!

### Events

The host is stored as an **embedded object** (name + id). This is a deliberate denormalization so you can display who is hosting without an extra lookup. Invites are stored as an array of **reference IDs** pointing to the invites collection.

### Users

Has a custom **regex validator** on the email field (also lowercased and trimmed). Dietary restrictions are an embedded object where every field defaults to `false` (not restricted) unless specified. Two reference arrays track sent and received invites.

### Invites

The most complex collection. Contains three embedded objects: the event, the person who sent the invite, and the recipient. Food and drink contributions are stored as an **array of subdocuments**. Each gets its own `_id` automatically. RSVP status is an **enum**: `pending` (default), `accepted`, or `declined`.

**Embedding vs. references** - embedding the host in events and the event/user info in invites trades some redundancy for fewer round-trips. The risk is that references can go stale in ways a relational database would prevent. My code does account for that in the implemented endpoints, but it takes some extra awareness for sure.

## Takeaways from the process, fresh from my project journal

- Mongoose SchemaTypes are not TypeScript types but values (e.g. String, Number, Types.ObjectId)
- Mongoose provides the full created object, including \_id, immediately after creation!
- Subdocuments get their own \_id automatically 🥳
- Mongoose can infer its own TypeScript types from a schema (InferSchemaType)
- Regex .test() as a custom Mongoose validator
- TypeScript structural typing: A function only checks that required typed fields exist. Extra fields on the
  passed object are fine
- Layered architecture: Hands-on understanding of the server → app → routes → controllers → services → models chain

## What's next?
**Remaining endpoints** - several are yet to be implemented. Some politely respond with `501 Not Implemented`.

**Authentication and authorization** - right now there's no concept of who's making a request. In future development, users will log in and be able to manage only their own events and invites.

**Automated testing** - the layered architecture makes this a natural next step.

**Frontend** - of course, it will need an UI to actually create and respond to invites! I don't think my guests would be too enthusiastic with being referred to Postman..

**Relational database** - MongoDB works here, but the domain has many natural entities and relationships (users, events, invites, contributions, dietary restrictions). This project may become my thesis project, at which point revisiting a relational model like PostgreSQL would make sense.

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
