import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('avatar').nullable().after('full_name')
      table.decimal('initial_balance', 12, 2).nullable().defaultTo(0).after('avatar')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, () => {
    })
  }
}