import Ingredient from '#models/ingredient'
import type { HttpContext } from '@adonisjs/core/http'

export default class IngredientController {
  async get({}: HttpContext) {
    return Ingredient.all()
  }
}
