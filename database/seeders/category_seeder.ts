import Category from '#models/category'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { SmoothieCategory } from '../../app/utils/enums/smoothie_category.js'

export default class extends BaseSeeder {
  async run() {
    const categories = [
      {
        name: SmoothieCategory.PROTEIN,
      },
      {
        name: SmoothieCategory.ENERGY,
      },
      {
        name: SmoothieCategory.VEGAN,
      },
    ]

    for (const category of categories) {
      await Category.firstOrCreate(
        {
          name: category.name,
        },
        category
      )
    }
  }
}
