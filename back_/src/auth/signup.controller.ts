import { Request, Response } from 'express'
import prisma from '../prisma'
import { hash } from 'bcrypt'
import isEmpty from '../utils/isEmpty'
import findUserByEmail from '../utils/findUserByEmail'
import createToken from '../utils/createToken'

const signUp = async ({ body }: Request, res: Response) => {
  const { name, email, password } = body

  try {
    // checks if fields are empty
    isEmpty({ name, email, password })

    // checks name length
    if (name.trim().length < 3) {
      throw new Error('Your name must contain at least 3 characters')
    }

    if (name.length > 32) {
      throw new Error('Your name must not exceed 32 characters')
    }

    const exists = await findUserByEmail(email)

    if (exists) {
      throw new Error('This email is already in use')
    }

    // checks if email is valid
    const isEmail = () => (
      email
        .toLowerCase()
        .match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    )

    if (!isEmail()) {
      throw new Error('Your email is invalid')
    }

    // checks if password is strong enough
    type PasswordErrorProps = {
      message: string,
      invalidRegExps: string[]
    }

    const isStrongPassword = (password: string) => {
      const error: PasswordErrorProps = {
        message: '',
        invalidRegExps: []
      }

      const regexps = [{
        regExp: /^.{8,}/,
        message: '8 characters'
      }, {
        regExp: /[A-Z]/,
        message: '1 uppercase character'
      }, {
        regExp: /[a-z]/,
        message: '1 lowercase character'
      }, {
        regExp: /\d/,
        message: '1 number'
      }, {
        regExp: /[^a-zA-Z\d]/,
        message: '1 special character'
      }]

      regexps.map(({ regExp, message }) => {
        if (!password.match(regExp)) {
          error.invalidRegExps.push(message)

          if (error.invalidRegExps.length === 1) {
            return error.message = `Your password must contain at least ${message}`
          }

          return error.message = 'Your password isn\'t strong enough'
        }
      })

      return { passwordError: error }
    }

    isStrongPassword(password)

    const { passwordError } = isStrongPassword(password)

    if (passwordError.message) {
      throw new Error(passwordError.message)
    }

    const hashedPassword = await hash(password, 10)

    const user = await prisma.user.create({
      data: {
        ...body,
        password: hashedPassword
      }
    })

    const token = createToken(user.id)

    res.status(200).json({ user, token })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export default signUp