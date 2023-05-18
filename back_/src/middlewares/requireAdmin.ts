import prisma from '../prisma'

import { Request, Response, NextFunction } from 'express'

const requireAdmin = async (_req: Request, res: Response, _next: NextFunction) => {
  try {
    const { role } = await prisma.user.findUnique({
      where: {
        id: res.locals.user
      }
    }) as { role: string }

    if (role !== 'ADMIN') {
      throw new Error('You don\'t have permission')
    }
  } catch ({ message }: any) {
    res.status(403).json({ message })
  }
}

export default requireAdmin