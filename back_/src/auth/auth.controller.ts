import { Request, Response, NextFunction } from 'express'

import { signupService, loginService } from './auth.service'

export const signup = async ({ body }: Request, res: Response, next: NextFunction) => {
  try {
    const data = await signupService(body)

    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

export const login = async ({ body }: Request, res: Response, next: NextFunction) => {
  try {
    const data = await loginService(body)

    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}