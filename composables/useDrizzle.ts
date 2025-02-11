import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2'

/**
 * drizzleのクライアント
 */
export const useDrizzle = () => {
  // if (!process.env.NUXT_DATABASE_URL) {
  //   throw new Error('環境変数が正常によみこめなかったお')
  // }

  const connection = mysql.createPool({ uri: 'mysql://root:root@localhost:3306/demo' })

  // drizzle クライアントの作成
  const db = drizzle(connection)

  // 接続プールを閉じる関数
  const closeConnectionPool = async () => {
    await connection.end()
  }
  return {
    db,
    closeConnectionPool,
  }
}
