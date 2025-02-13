import { drizzle } from 'drizzle-orm/mysql2'
import { users, weights } from './schema'

async function main() {
  // drizzle クライアントの作成
  const db = drizzle(process.env.DATABASE_URL || '')

  const userId = 'user_2stcFRLO3mjlvnsiJXMki6Qr1zB'

  // ユーザデータの作成
  const user1: typeof users.$inferInsert = {
    id: userId,
    height: null,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  try {
    // ユーザを挿入
    await db.insert(users).values(user1)
    console.log('ユーザを追加しました')

    // 挿入したユーザを取得
    const usersData = await db.select().from(users)
    console.log('Getting all users from the database: ', usersData)

    // 体重データの作成
    const weight1: typeof weights.$inferInsert = {
      userId: userId,
      weight: 70.5,
      recordedDate: new Date('2025-02-13'),
      memo: '初回の体重記録',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const weight2: typeof weights.$inferInsert = {
      userId: userId,
      weight: 71.0,
      recordedDate: new Date('2025-02-14'),
      memo: '体重が少し増えた',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const weight3: typeof weights.$inferInsert = {
      userId: userId,
      weight: 70.0,
      recordedDate: new Date('2025-02-15'),
      memo: '運動しすぎてめっちゃ減った',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // 体重を挿入
    await db.insert(weights).values([weight1, weight2, weight3])
    console.log('New weights created!')

    // 挿入した体重を取得
    const weightsData = await db.select().from(weights)
    console.log('Getting all weights from the database: ', weightsData)
  }
  catch (e) {
    console.error(e)
  }
}
main()
