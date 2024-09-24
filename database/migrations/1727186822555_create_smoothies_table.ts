import { BaseSchema } from '@adonisjs/lucid/schema'
import { SmoothieCategory } from '../../app/utils/enums/smoothie_category.js'

export default class extends BaseSchema {
  protected tableName = 'smoothies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.enum('category', Object.values(SmoothieCategory)).notNullable()
      table.integer('author_id').unsigned().references('id').inTable('users').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
