import { Router } from 'express'

import UsersController from './users.controller'

const usersRouter = Router()

const usersController = new UsersController()

usersRouter
  .get('/', usersController.findAll)
  .get('/:id', usersController.findOne)
  .delete('/:id', usersController.remove)

export default usersRouter