import { addItem } from '../utils/store'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body?.name || typeof body.name !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'name is required'
    })
  }

  const item = addItem(body.name.trim())
  return item
})
