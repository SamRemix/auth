import { Router } from 'express'

import signUp from './signup.controller'
import logIn from './login.controller'

export const router = Router()

router
  .post('/sign-up', signUp)
  .post('/log-in', logIn)