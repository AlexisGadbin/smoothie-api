import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Category from './category.js'
import Ingredient from './ingredient.js'
import User from './user.js'

export default class Smoothie extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare authorId: number

  @belongsTo(() => User)
  declare author: BelongsTo<typeof User>

  @manyToMany(() => Ingredient, {
    pivotTable: 'smoothie_ingredients',
    pivotColumns: ['quantity', 'unit'],
  })
  declare ingredients: ManyToMany<typeof Ingredient>

  @manyToMany(() => Category, {
    pivotTable: 'smoothie_categories',
  })
  declare categories: ManyToMany<typeof Category>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
