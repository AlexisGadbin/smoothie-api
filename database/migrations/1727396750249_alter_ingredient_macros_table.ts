import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'ingredients'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.float('calories').notNullable()
      table.float('protein').notNullable()
      table.float('carbs').notNullable()
      table.float('fat').notNullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('calories')
      table.dropColumn('protein')
      table.dropColumn('carbs')
      table.dropColumn('fat')
    })
  }
}
