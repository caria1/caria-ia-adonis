import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'banks'

  async up() {
    const hasTable = await this.schema.hasTable(this.tableName)
    if (!hasTable) {
      this.schema.createTable(this.tableName, (table) => {
        table.increments('id')
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
        table.string('name').notNullable()
        table.string('type').notNullable().defaultTo('checking') // checking, savings, investment, etc.
        table.decimal('initial_balance', 12, 2).notNullable().defaultTo(0)
        table.string('color').nullable()
        table.string('icon').nullable()

        table.timestamp('created_at')
        table.timestamp('updated_at')
      })
    }
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}