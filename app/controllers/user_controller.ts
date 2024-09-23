import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UserController {
  async getByEmail({ request }: HttpContext) {
    const { email } = request.params()

    const user = await User.findBy('email', email)

    return {
      user,
    }
  }
}
