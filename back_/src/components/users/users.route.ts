import { Router } from 'express'

import UsersController from './users.controller'

import requireAuth from '../../middlewares/requireAuth'
import requireAdmin from '../../middlewares/requireAdmin'

const usersRouter = Router()

const { findAll, findOne, update, remove } = new UsersController()

usersRouter
  .use(requireAuth, requireAdmin)
  .get('/', findAll)
  .get('/:id', findOne)
  .put('/:id', update)
  .delete('/:id', remove)

export default usersRouter