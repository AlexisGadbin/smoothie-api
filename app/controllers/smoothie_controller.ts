import Smoothie from '#models/smoothie'
import { createSmoothieValidator } from '#validators/create_smoothie'
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

  async create({ request, auth }: HttpContext) {
    const data = await request.validateUsing(createSmoothieValidator)
    const user = auth.user!

    const smoothie = await Smoothie.create({
      name: data.name,
      color: '#64963f',
      authorId: user.id,
    })

    for (const ingredient of data.ingredients) {
      await smoothie.related('ingredients').attach({
        [ingredient.ingredientId]: {
          quantity: ingredient.quantity,
          unit: ingredient.unit,
        },
      })
    }

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
