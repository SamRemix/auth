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

  findOne = async ({ params }: Request, res: Response, next: NextFunction) => {
    try {
      const user = await usersService.findOne(params.id)

      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  update = async ({ params, body }: Request, res: Response, next: NextFunction) => {
    try {
      const user = await usersService.update(params.id, body)

      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  updatePassword = async ({ params, body }: Request, res: Response, next: NextFunction) => {
    try {
      const user = await usersService.updatePassword(params.id, body)

      res.status(200).json(user)
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