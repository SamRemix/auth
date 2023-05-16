import { NextFunction, Request, Response } from 'express'

import { findAllService } from './users.service'

export const findAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await findAllService()

    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}