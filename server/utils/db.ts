import { drizzle } from 'drizzle-orm/mysql2'

/**
 * drizzleのクライアント
 */
const config = useRuntimeConfig()
const db = drizzle(config.databaseUrl)

export { db }
