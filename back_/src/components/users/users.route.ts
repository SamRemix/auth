import { Router } from 'express'

import UsersController from './users.controller'

import requireAuth from '../../middlewares/requireAuth'
import requireAdmin from '../../middlewares/requireAdmin'

const usersRouter = Router()

const { findAll, findOne, update, updatePassword, remove } = new UsersController()

usersRouter
  .use(requireAuth, requireAdmin)
  .get('/', findAll)
  .get('/:id', findOne)
  .patch('/:id', update)
  .patch('/security/:id', updatePassword)
  .delete('/:id', remove)

export default usersRouter