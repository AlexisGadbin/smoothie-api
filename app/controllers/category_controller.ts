import Category from '#models/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoryController {
  async get({}: HttpContext) {
    return Category.all()
  }
}
