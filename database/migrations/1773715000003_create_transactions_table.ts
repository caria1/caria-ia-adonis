import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  async up() {
    const hasTable = await this.schema.hasTable(this.tableName)
    if (!hasTable) {
      this.schema.createTable(this.tableName, (table) => {
        table.increments('id')
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
        table.integer('category_id').unsigned().references('id').inTable('categories').onDelete('SET NULL')
        table.integer('bank_id').unsigned().references('id').inTable('banks').onDelete('SET NULL').nullable()
        table.string('description').notNullable()
        table.decimal('amount', 12, 2).notNullable()
        table.enum('type', ['income', 'expense']).notNullable().defaultTo('expense')
        table.timestamp('date').notNullable()
        table.boolean('is_recurring').notNullable().defaultTo(false)
        table.string('recurrence_period').nullable() // monthly, weekly, etc.

        table.timestamp('created_at')
        table.timestamp('updated_at')
      })
    }
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}