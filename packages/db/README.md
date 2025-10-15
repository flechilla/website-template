# @workspace/db

Shared database package using Drizzle ORM with PostgreSQL.

## Setup

1. Create a `.env` file in the root of the monorepo:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

2. Generate migrations:

```bash
pnpm --filter @workspace/db db:generate
```

3. Run migrations:

```bash
pnpm --filter @workspace/db db:migrate
```

## Usage

Import the database client and types in your app:

```typescript
import { type NewUser, type User, db } from '@workspace/db/client'
import { users } from '@workspace/db/schema'

// Query users
const allUsers = await db.select().from(users)

// Insert a user
const newUser: NewUser = {
    name: 'John Doe',
    email: 'john@example.com',
}
await db.insert(users).values(newUser)
```

## Scripts

- `pnpm db:generate` - Generate migrations from schema
- `pnpm db:migrate` - Run migrations
- `pnpm db:push` - Push schema changes directly to database (dev only)
- `pnpm db:studio` - Open Drizzle Studio
