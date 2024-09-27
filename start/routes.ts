/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const IngredientController = () => import('#controllers/ingredient_controller')
const CategoryController = () => import('#controllers/category_controller')
const SmoothieController = () => import('#controllers/smoothie_controller')
const UserController = () => import('#controllers/user_controller')

router
  .group(() => {
    router.get('/', async () => {
      return {
        hello: 'world',
      }
    })

    router
      .group(() => {
        router.post('register', [AuthController, 'register'])
        router.post('login', [AuthController, 'login'])
        router.delete('logout', [AuthController, 'logout']).use(middleware.auth())
        router.get('me', [AuthController, 'me'])
      })
      .prefix('auth')

    router.group(() => {
      router.get('users/:email', [UserController, 'getByEmail'])
    })

    router
      .group(() => {
        router.get('/', [SmoothieController, 'get'])
        router.get('day', [SmoothieController, 'smoothieOfTheDay'])
        router.post('/', [SmoothieController, 'create'])
      })
      .prefix('smoothie')
      .use(middleware.auth())

    router
      .group(() => {
        router.get('/', [CategoryController, 'get'])
      })
      .prefix('category')

    router
      .group(() => {
        router.get('/', [IngredientController, 'get'])
      })
      .prefix('ingredient')
  })
  .prefix('api')
