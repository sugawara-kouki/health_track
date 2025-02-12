import { users } from './schema'
import { useDrizzle } from '~/composables/useDrizzle'

async function main() {
  const { db, closeConnectionPool } = useDrizzle()

  const user: typeof users.$inferInsert = {
    name: 'John',
    age: 30,
    email: 'john@example.com'
  }
  try {
    await db.insert(users).values(user)
    console.log('New user created!')
    const usersData = await db.select().from(users)
    console.log('Getting all users from the database: ', usersData)
  }
  catch (e) {
    console.error(e)
  }
  finally {
    // DBとの接続を切ります
    await closeConnectionPool()
  }
}
main()
