import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'categories'

  async up() {
    this.db.rawQuery(
      `UPDATE categories SET name = 'Lazer' WHERE name = 'Laser'`
    )
    this.db.rawQuery(
      `UPDATE categories SET name = 'Presentes' WHERE name = 'Apresenta'`
    )
  }

  async down() {
    this.db.rawQuery(
      `UPDATE categories SET name = 'Laser' WHERE name = 'Lazer'`
    )
    this.db.rawQuery(
      `UPDATE categories SET name = 'Apresenta' WHERE name = 'Presentes'`
    )
  }
}
