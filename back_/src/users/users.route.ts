import { Router } from 'express'

import UsersController from './users.controller'

const usersRouter = Router()

const usersController = new UsersController()

usersRouter.get('/', usersController.findAll)

export default usersRouter