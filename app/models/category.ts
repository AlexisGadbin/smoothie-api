import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { SmoothieCategory } from '../utils/enums/smoothie_category.js'
import Smoothie from './smoothie.js'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: SmoothieCategory

  @manyToMany(() => Smoothie, {
    pivotTable: 'smoothie_categories',
  })
  declare smoothies: ManyToMany<typeof Smoothie>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
