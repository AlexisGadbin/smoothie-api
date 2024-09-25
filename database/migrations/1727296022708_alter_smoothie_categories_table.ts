import { BaseSchema } from '@adonisjs/lucid/schema'
import { SmoothieCategory } from '../../app/utils/enums/smoothie_category.js'

export default class extends BaseSchema {
  protected tableName = 'smoothies'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('category')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('category', Object.values(SmoothieCategory)).notNullable()
    })
  }
}
