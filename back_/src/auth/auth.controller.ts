import { Request, Response, NextFunction } from 'express'

import AuthService from './auth.service'

const authService = new AuthService()

class AuthController {
  signup = async ({ body }: Request, res: Response, next: NextFunction) => {
    try {
      const data = await authService.signup(body)

      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  login = async ({ body }: Request, res: Response, next: NextFunction) => {
    try {
      const data = await authService.login(body)

      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
}

export default AuthController