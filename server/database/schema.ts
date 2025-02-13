import { mysqlTable, varchar, float, timestamp, serial, date } from 'drizzle-orm/mysql-core'

// ユーザ管理テーブル
export const users = mysqlTable('users', {
  id: varchar({ length: 255 }).primaryKey(),
  height: float(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().onUpdateNow()
})

// 体重管理テーブル
export const weights = mysqlTable('weights', {
  id: serial().primaryKey(),
  userId: varchar({ length: 255 }).notNull().references(() => users.id),
  weight: float().notNull(),
  recordedDate: date().notNull(),
  memo: varchar({ length: 255 }),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().onUpdateNow().notNull()
})
