import Category from '#models/category'
import Ingredient from '#models/ingredient'
import Smoothie from '#models/smoothie'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { GenderEnum } from '../../app/utils/enums/gender.js'
import { IngredientCategory } from '../../app/utils/enums/ingredient_category.js'
import { SmoothieCategory } from '../../app/utils/enums/smoothie_category.js'
import { Unit } from '../../app/utils/enums/unit.js'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        email: 'test@test.com',
        password: 'networks',
        firstName: 'John',
        lastName: 'Doe',
        gender: GenderEnum.Other,
        birthDate: new Date('1990-01-01'),
      },
    ])

    const categories = await Category.createMany([
      {
        name: SmoothieCategory.PROTEIN,
      },
      {
        name: SmoothieCategory.ENERGY,
      },
      {
        name: SmoothieCategory.VEGAN,
      },
    ])

    const ingredients = await Ingredient.createMany([
      {
        name: 'Apple',
        category: IngredientCategory.FRUIT,
        imageUrl: 'apple.png',
      },
      {
        name: 'Orange',
        category: IngredientCategory.FRUIT,
        imageUrl: 'orange.png',
      },
      {
        name: 'Lemon',
        category: IngredientCategory.FRUIT,
        imageUrl: 'lemon.png',
      },
      {
        name: 'Kiwi',
        category: IngredientCategory.FRUIT,
        imageUrl: 'kiwi.png',
      },
      {
        name: 'White Grape',
        category: IngredientCategory.FRUIT,
        imageUrl: 'white_grape.png',
      },
      {
        name: 'Blueberry',
        category: IngredientCategory.FRUIT,
        imageUrl: 'blueberry.png',
      },
      {
        name: 'Strawberry',
        category: IngredientCategory.FRUIT,
        imageUrl: 'strawberry.png',
      },
      {
        name: 'Watermelon',
        category: IngredientCategory.FRUIT,
        imageUrl: 'watermelon.png',
      },
      {
        name: 'Pineapple',
        category: IngredientCategory.FRUIT,
        imageUrl: 'pineapple.png',
      },
      {
        name: 'Peach',
        category: IngredientCategory.FRUIT,
        imageUrl: 'peach.png',
      },
      {
        name: 'Cherry',
        category: IngredientCategory.FRUIT,
        imageUrl: 'cherry.png',
      },
      {
        name: 'Banana',
        category: IngredientCategory.FRUIT,
        imageUrl: 'banana.png',
      },
      {
        name: 'Pear',
        category: IngredientCategory.FRUIT,
        imageUrl: 'pear.png',
      },
      {
        name: 'Grenade',
        category: IngredientCategory.FRUIT,
        imageUrl: 'grenade.png',
      },
      {
        name: 'Melon',
        category: IngredientCategory.FRUIT,
        imageUrl: 'melon.png',
      },
      {
        name: 'Grape',
        category: IngredientCategory.FRUIT,
        imageUrl: 'grape.png',
      },
      {
        name: 'Raspberry',
        category: IngredientCategory.FRUIT,
        imageUrl: 'raspberry.png',
      },
      {
        name: 'Coconut',
        category: IngredientCategory.FRUIT,
        imageUrl: 'coconut.png',
      },
    ])

    const smoothie = await Smoothie.create({
      name: 'Green Smoothie',
      authorId: 1,
      color: '#64963f',
    })

    await smoothie.related('ingredients').attach({
      [ingredients[0].id]: {
        quantity: 2,
        unit: Unit.WHOLE,
      },
      [ingredients[1].id]: {
        quantity: 100,
        unit: Unit.GRAM,
      },
      [ingredients[2].id]: {
        quantity: 200,
        unit: Unit.GRAM,
      },
      [ingredients[3].id]: {
        quantity: 1,
        unit: Unit.GRAM,
      },
    })

    await smoothie.related('categories').attach({
      [categories[0].id]: {},
      [categories[1].id]: {},
    })
  }
}
