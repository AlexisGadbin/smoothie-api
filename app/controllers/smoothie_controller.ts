import Category from '#models/category'
import Smoothie from '#models/smoothie'
import SmoothieService from '#services/smoothie_service'
import { createSmoothieValidator } from '#validators/create_smoothie'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { SmoothieCategory } from '../utils/enums/smoothie_category.js'

@inject()
export default class SmoothieController {
  constructor(private smoothieService: SmoothieService) {}

  async get({}: HttpContext) {
    const smoothies = await Smoothie.query()
      .preload('categories')
      .preload('ingredients', (builder) => {
        builder.pivotColumns(['quantity', 'unit'])
      })

    return this._populateSmoothiesWithIngredients(smoothies)
  }

  async getById({ params }: HttpContext) {
    const smoothie = await Smoothie.query()
      .where('id', params.id)
      .preload('categories')
      .preload('ingredients', (builder) => {
        builder.pivotColumns(['quantity', 'unit'])
      })
      .firstOrFail()

    return this._populateSmoothieWithIngredients(smoothie)
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
      color: data.color,
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

    await smoothie.load('ingredients', (builder) => {
      builder.pivotColumns(['quantity', 'unit'])
    })

    const categories: SmoothieCategory[] = await this.smoothieService.calculateCategories(smoothie)

    const categoryIds = await Category.query()
      .whereIn('name', categories)
      .select('id')
      .then((c) => c.map((category) => category.id))

    await smoothie.related('categories').attach(categoryIds)

    return smoothie
  }

  async _populateSmoothiesWithIngredients(smoothies: Smoothie[]) {
    return Promise.all(smoothies.map((smoothie) => this._populateSmoothieWithIngredients(smoothie)))
  }

  async _populateSmoothieWithIngredients(smoothie: Smoothie) {
    return {
      ...smoothie.toJSON(),
      ingredients: smoothie.ingredients.map((ingredient) => ({
        ...ingredient.toJSON(),
        quantity: ingredient.$extras.pivot_quantity,
        unit: ingredient.$extras.pivot_unit,
      })),
    }
  }
}
