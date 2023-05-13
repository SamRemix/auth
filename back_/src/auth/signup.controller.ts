import { Request, Response, NextFunction } from 'express'
import signUpService from './signup.service'

const signUp = async ({ body }: Request, res: Response, next: NextFunction) => {
  try {
    const { user, token } = await signUpService(body)

    res.status(200).json({ user, token })
  } catch (error) {
    next(error)
  }
}

export default signUp