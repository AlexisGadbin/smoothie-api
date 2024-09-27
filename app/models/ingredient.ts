import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { IngredientCategory } from '../utils/enums/ingredient_category.js'
import Smoothie from './smoothie.js'

export default class Ingredient extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare category: IngredientCategory

  @column()
  declare imageUrl: string

  @column()
  declare calories: number

  @column()
  declare protein: number

  @column()
  declare carbs: number

  @column()
  declare fat: number

  @manyToMany(() => Smoothie, {
    pivotTable: 'smoothie_ingredients',
    pivotColumns: ['quantity', 'unit'],
  })
  declare smoothies: ManyToMany<typeof Smoothie>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
