import Smoothie from '#models/smoothie'
import type { HttpContext } from '@adonisjs/core/http'

export default class SmoothieController {
  async get({}: HttpContext) {
    const smoothies = await Smoothie.query()
      .preload('categories')
      .preload('ingredients', (builder) => {
        builder.pivotColumns(['quantity', 'unit'])
      })

    return this._populateSmoothieWithIngredients(smoothies)
  }

  async smoothieOfTheDay({}: HttpContext) {
    const smoothie = await Smoothie.query()
      .preload('ingredients', (builder) => {
        builder.pivotColumns(['quantity', 'unit'])
      })
      .preload('categories')
      .orderByRaw('RANDOM()')
      .firstOrFail()

    return smoothie
  }

  async _populateSmoothieWithIngredients(smoothies: Smoothie[]) {
    return smoothies.map((smoothie) => {
      return {
        ...smoothie.toJSON(),
        ingredients: smoothie.ingredients.map((ingredient) => ({
          ...ingredient.toJSON(),
          quantity: ingredient.$extras.pivot_quantity,
          unit: ingredient.$extras.pivot_unit,
        })),
      }
    })
  }
}
