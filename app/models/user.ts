import { UserSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { beforeSave, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Category from '#models/category'
import Transaction from '#models/transaction'

export default class User extends compose(UserSchema, withAuthFinder(hash)) {
  @beforeSave()
  static async hashPassword(user: any) {
    if (user.$dirty.password) {
      user.password = await hash.make(user.password)
    }
  }
  @column()
  declare avatar: string | null

  @column()
  declare initialBalance: number

  @hasMany(() => Category)
  declare categories: HasMany<typeof Category>

  @hasMany(() => Transaction)
  declare transactions: HasMany<typeof Transaction>

  get initials() {
    const [first, last] = this.fullName ? this.fullName.split(' ') : this.email.split('@')
    if (first && last) {
      return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
    }
    return `${first.slice(0, 2)}`.toUpperCase()
  }
}
