import { Router } from 'express'

import { findAll } from './users.controller'

export const router = Router()

router.get('/', findAll)