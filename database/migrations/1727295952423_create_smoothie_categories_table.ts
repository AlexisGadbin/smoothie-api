import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'smoothie_categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer('smoothie_id')
        .unsigned()
        .references('id')
        .inTable('smoothies')
        .onDelete('CASCADE')
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('categories')
        .onDelete('CASCADE')

      table.primary(['smoothie_id', 'category_id'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
