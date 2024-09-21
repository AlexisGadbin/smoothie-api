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
  })
  .prefix('api')
