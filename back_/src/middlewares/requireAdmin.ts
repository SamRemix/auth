import { Request, Response, NextFunction } from 'express'

import findUser from '../utils/findUser'

const requireAdmin = async (_req: Request, { locals }: Response, next: NextFunction) => {
  try {
    // res.locals.user is defined in requireAuth middleware
    const { role } = await findUser(locals.user)

    if (!role.includes('ADMIN')) {
      throw new Error('You don\'t have permission to access this resource.')
    }

    next()
  } catch ({ message }: any) {
    next({ status: 403, message })
  }
}

export default requireAdmin