import vine from '@vinejs/vine'
import { GenderEnum } from '../utils/enums/gender.js'

const password = vine.string().minLength(8)

export const registerValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const match = await db.from('users').select('id').where('email', value).first()

        return !match
      }),

    password,
    confirmPassword: password,
    firstName: vine.string().trim().minLength(2),
    lastName: vine.string().trim().minLength(2),
    gender: vine.enum(GenderEnum).nullable(),
    birthDate: vine.date(),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password,
  })
)
