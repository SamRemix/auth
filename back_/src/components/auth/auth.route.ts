import { Router } from 'express'

import AuthController from './auth.controller'

const authRouter = Router()

const { signup, login } = new AuthController()

authRouter
  .post('/signup', signup)
  .post('/login', login)

export default authRouter