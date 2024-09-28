import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Smoothie from './smoothie.js'

export default class DailySmoothie extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @belongsTo(() => Smoothie)
  declare smoothie: BelongsTo<typeof Smoothie>

  @column()
  declare smoothieId: number

  @column()
  declare date: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
