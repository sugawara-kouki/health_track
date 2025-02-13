import { eq } from 'drizzle-orm'
import { users } from '~/server/database/schema'
import { db } from '~/server/utils/db'

export interface getHeightParams {
  userId: string
}

export default defineEventHandler(async (event) => {
  const params = getQuery<getHeightParams>(event)

  if (!params.userId) {
    return {
      statusCode: 400,
      data: [],
      message: 'Bad request.'
    }
  }

  try {
    const userHeights = await db.select({ height: users.height }).from(users).where(eq(users.id, params.userId)).limit(1)

    if (!userHeights || userHeights.length < 1) {
      return {
        statusCode: 404,
        data: [],
        message: 'Users data not found.'
      }
    }

    return {
      statusCode: 200,
      data: userHeights[0],
      message: 'Users data found.'
    }
  }
  catch (error) {
    console.error('Database Error:', error)
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error.' })
  }
})
