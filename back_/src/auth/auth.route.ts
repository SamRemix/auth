import { Router } from 'express'
import signUp from './signup.controller'

export const router = Router()

router
  .post('/sign-up', signUp)