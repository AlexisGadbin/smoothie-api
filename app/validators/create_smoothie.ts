import vine from '@vinejs/vine'
import { Unit } from '../utils/enums/unit.js'

export const createSmoothieValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(2),
    ingredients: vine.array(
      vine.object({
        ingredientId: vine.number(),
        name: vine.string().minLength(1),
        quantity: vine.number(),
        unit: vine.enum(Object.values(Unit)),
      })
    ),
  })
)
