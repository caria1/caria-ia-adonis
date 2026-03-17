import { TransactionSchema } from '#database/schema'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Category from '#models/category'
import Bank from '#models/bank'

export default class Transaction extends TransactionSchema {
  @column()
  declare bankId: number | null

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  @belongsTo(() => Bank)
  declare bank: BelongsTo<typeof Bank>
}