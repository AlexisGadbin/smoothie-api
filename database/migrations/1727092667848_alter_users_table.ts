import { BaseSchema } from '@adonisjs/lucid/schema'
import { GenderEnum } from '../../app/utils/enums/gender_enum.js'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('full_name')
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.date('birth_date').notNullable()
      table.enum('gender', Object.values(GenderEnum)).nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('full_name').notNullable()
      table.dropColumn('first_name')
      table.dropColumn('last_name')
      table.dropColumn('birth_date')
      table.dropColumn('gender')
    })
  }
}
