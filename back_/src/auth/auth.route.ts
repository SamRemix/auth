import { Router } from 'express'

import AuthController from './auth.controller'

const authRouter = Router()

const authController = new AuthController()

authRouter
  .post('/signup', authController.signup)
  .post('/login', authController.login)

export default authRouter