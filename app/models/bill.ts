import { DateTime } from 'luxon'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Category from '#models/category'
import { BillSchema } from '#database/schema'

export default class Bill extends BillSchema {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare categoryId: number | null

  @column()
  declare description: string

  @column()
  declare amount: number

  @column()
  declare type: 'income' | 'expense'

  @column.dateTime()
  declare dueDate: DateTime

  @column()
  declare status: 'pending' | 'paid' | 'overdue'

  @column()
  declare isRecurring: boolean

  @column()
  declare recurrencePeriod: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>
}