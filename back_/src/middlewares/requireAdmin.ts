import { Request, Response, NextFunction } from 'express'

import findUser from '../utils/findUser'

const requireAdmin = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    // res.locals.user is defined in requireAuth middleware
    const { role } = await findUser({ id: res.locals.user })

    if (role !== 'ADMIN') {
      throw new Error('You don\'t have permission')
    }

    next()
  } catch ({ message }: any) {
    res.status(403).json({ message })
  }
}

export default requireAdmin