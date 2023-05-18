import { Request, Response, NextFunction } from 'express'

import findUserById from '../utils/findUserById'

const requireAdmin = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { role } = await findUserById(res.locals.user)

    if (role !== 'ADMIN') {
      throw new Error('You don\'t have permission')
    }

    next()
  } catch ({ message }: any) {
    res.status(403).json({ message })
  }
}

export default requireAdmin