import { Router } from 'express'

import { signup, login } from './auth.controller'

export const router = Router()

router
  .post('/sign-up', signup)
  .post('/log-in', login)