import { BaseSchema } from '@adonisjs/lucid/schema'
import { Unit } from '../../app/utils/enums/unit.js'

export default class extends BaseSchema {
  protected tableName = 'smoothie_ingredients'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('smoothie_id')
        .unsigned()
        .references('smoothies.id')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('ingredient_id')
        .unsigned()
        .references('ingredients.id')
        .onDelete('CASCADE')
        .notNullable()
      table.integer('quantity').unsigned().notNullable()
      table.enum('unit', Object.values(Unit)).notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
