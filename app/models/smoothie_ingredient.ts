import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { Unit } from '../utils/enums/unit.js'
import Ingredient from './ingredient.js'
import Smoothie from './smoothie.js'

export default class SmoothieIngredient extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare smoothieId: number

  @column()
  declare ingredientId: number

  @column()
  declare quantity: number

  @column()
  declare unit: Unit

  @belongsTo(() => Smoothie)
  declare smoothie: BelongsTo<typeof Smoothie>

  @belongsTo(() => Ingredient)
  declare ingredient: BelongsTo<typeof Ingredient>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
