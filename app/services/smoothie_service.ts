import Smoothie from '#models/smoothie'
import { SmoothieCategory } from '../utils/enums/smoothie_category.js'

type Macro = {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export default class SmoothieService {
  async calculateCategories(smoothie: Smoothie): Promise<SmoothieCategory[]> {
    const macros = await this.calculateMacros(smoothie)
    let categories: SmoothieCategory[] = []

    if (macros.calories > 300 && macros.carbs > 40) {
      categories.push(SmoothieCategory.ENERGY)
    }

    if (macros.protein > 15) {
      categories.push(SmoothieCategory.PROTEIN)
    }

    return categories
  }

  async calculateMacros(smoothie: Smoothie): Promise<Macro> {
    let totalCalories = 0
    let totalProtein = 0
    let totalCarbs = 0
    let totalFat = 0

    smoothie.ingredients.forEach((ingredientPivot) => {
      const ingredient = ingredientPivot
      const quantity = ingredientPivot.$extras.pivot_quantity
      // Later, get the unit from the pivot table

      const factor = quantity / 100

      totalCalories += ingredient.calories * factor
      totalProtein += ingredient.protein * factor
      totalCarbs += ingredient.carbs * factor
      totalFat += ingredient.fat * factor
    })

    return {
      calories: totalCalories,
      protein: totalProtein,
      carbs: totalCarbs,
      fat: totalFat,
    }
  }
}
