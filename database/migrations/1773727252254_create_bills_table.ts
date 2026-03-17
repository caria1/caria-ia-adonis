import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bills'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('category_id').unsigned().references('id').inTable('categories').onDelete('SET NULL')
      table.string('description').notNullable()
      table.decimal('amount', 12, 2).notNullable()
      table.enum('type', ['income', 'expense']).notNullable().defaultTo('expense')
      table.timestamp('due_date').notNullable()
      table.enum('status', ['pending', 'paid', 'overdue']).notNullable().defaultTo('pending')
      table.boolean('is_recurring').notNullable().defaultTo(false)
      table.string('recurrence_period').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}