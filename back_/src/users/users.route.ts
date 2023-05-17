import { Router } from 'express'

import UsersController from './users.controller'

const usersRouter = Router()

const { findAll, findOne, update, remove } = new UsersController()

usersRouter
  .get('/', findAll)
  .get('/:id', findOne)
  .put('/:id', update)
  .delete('/:id', remove)

export default usersRouter