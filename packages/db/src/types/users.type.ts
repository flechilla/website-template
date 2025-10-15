import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'

import * as schema from '../schema/index.ts'

// Users
export type User = InferSelectModel<typeof schema.users>
export type NewUser = InferInsertModel<typeof schema.users>
