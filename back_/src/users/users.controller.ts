import { NextFunction, Request, Response } from 'express'

import UsersService from './users.service'

const usersService = new UsersService()

class UsersController {
  findAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await usersService.findAll()

      res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  }

  remove = async ({ params }: Request, res: Response, next: NextFunction) => {
    try {
      const user = await usersService.remove(params.id)

      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
}

export default UsersController