import { Request, Response, NextFunction } from 'express'
import logInService from './login.service'

const logIn = async ({ body }: Request, res: Response, next: NextFunction) => {
  try {
    const { user, token } = await logInService(body)

    res.status(200).json({ user, token })
  } catch (error) {
    next(error)
  }
}

export default logIn