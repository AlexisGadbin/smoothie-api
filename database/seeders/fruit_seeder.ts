import Ingredient from '#models/ingredient'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { IngredientCategory } from '../../app/utils/enums/ingredient_category.js'

export default class extends BaseSeeder {
  async run() {
    const ingredients = [
      {
        name: 'Pomme',
        category: IngredientCategory.FRUIT,
        imageUrl: 'apple.png',
        calories: 52,
        protein: 0.3,
        carbs: 11.3,
        fat: 0.4,
      },
      {
        name: 'Orange',
        category: IngredientCategory.FRUIT,
        imageUrl: 'orange.png',
        calories: 43,
        protein: 1,
        carbs: 8.3,
        fat: 0.2,
      },
      {
        name: 'Lemon',
        category: IngredientCategory.FRUIT,
        imageUrl: 'lemon.png',
        calories: 29,
        protein: 1.1,
        carbs: 9,
        fat: 0.3,
      },
      {
        name: 'Kiwi',
        category: IngredientCategory.FRUIT,
        imageUrl: 'kiwi.png',
        calories: 61,
        protein: 1.1,
        carbs: 14.7,
        fat: 0.5,
      },
      {
        name: 'Blueberry',
        category: IngredientCategory.FRUIT,
        imageUrl: 'blueberry.png',
        calories: 29,
        protein: 0,
        carbs: 5.4,
        fat: 0.3,
      },
      {
        name: 'Strawberry',
        category: IngredientCategory.FRUIT,
        imageUrl: 'strawberry.png',
        calories: 32,
        protein: 0.7,
        carbs: 5.5,
        fat: 0.4,
      },
      {
        name: 'Watermelon',
        category: IngredientCategory.FRUIT,
        imageUrl: 'watermelon.png',
        calories: 30,
        protein: 0.6,
        carbs: 8,
        fat: 0.2,
      },
      {
        name: 'Pineapple',
        category: IngredientCategory.FRUIT,
        imageUrl: 'pineapple.png',
        calories: 50,
        protein: 0.5,
        carbs: 13.1,
        fat: 0.1,
      },
      {
        name: 'Peach',
        category: IngredientCategory.FRUIT,
        imageUrl: 'peach.png',
        calories: 39,
        protein: 0.9,
        carbs: 9.5,
        fat: 0.3,
      },
      {
        name: 'Cherry',
        category: IngredientCategory.FRUIT,
        imageUrl: 'cherry.png',
        calories: 50,
        protein: 1,
        carbs: 12,
        fat: 0.3,
      },
      {
        name: 'Banana',
        category: IngredientCategory.FRUIT,
        imageUrl: 'banana.png',
        calories: 96,
        protein: 1.3,
        carbs: 20.8,
        fat: 0.2,
      },
      {
        name: 'Pear',
        category: IngredientCategory.FRUIT,
        imageUrl: 'pear.png',
        calories: 57,
        protein: 0.4,
        carbs: 15.5,
        fat: 0.1,
      },
      {
        name: 'Melon',
        category: IngredientCategory.FRUIT,
        imageUrl: 'melon.png',
        calories: 34,
        protein: 0,
        carbs: 8.2,
        fat: 0,
      },
      {
        name: 'Grape',
        category: IngredientCategory.FRUIT,
        imageUrl: 'grape.png',
        calories: 69,
        protein: 0.6,
        carbs: 18.1,
        fat: 0.2,
      },
      {
        name: 'Raspberry',
        category: IngredientCategory.FRUIT,
        imageUrl: 'raspberry.png',
        calories: 52,
        protein: 1.2,
        carbs: 11.9,
        fat: 0.7,
      },
      {
        name: 'Coconut',
        category: IngredientCategory.FRUIT,
        imageUrl: 'coconut.png',
        calories: 354,
        protein: 3.3,
        carbs: 15.2,
        fat: 33.5,
      },
    ]

    for (const ingredient of ingredients) {
      await Ingredient.firstOrCreate(
        {
          name: ingredient.name,
        },
        ingredient
      )
    }
  }
}
