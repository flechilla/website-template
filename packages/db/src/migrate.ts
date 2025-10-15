import * as dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

dotenv.config({ path: '../../.env' })

const runMigrations = async () => {
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL is not defined')
    }

    console.log('⏳ Running migrations...')

    const client = postgres(process.env.DATABASE_URL, { max: 1 })
    const db = drizzle(client)

    await migrate(db, { migrationsFolder: './migrations' })

    await client.end()

    console.log('✅ Migrations completed')
}

runMigrations().catch((err) => {
    console.error('❌ Migration failed')
    console.error(err)
    process.exit(1)
})
