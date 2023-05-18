import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import findUser from '../utils/findUser'

const requireAuth = async ({ headers }: Request, res: Response, next: NextFunction) => {
  const { authorization } = headers

  if (!authorization) {
    return res.status(401).json({ message: 'Authorization token required' })
  }

  // remove the token prefix ('Bearer ')
  const token = authorization.split(' ')[1]

  try {
    const decoded = verify(token, process.env.SECRET as string) as any

    const { id } = await findUser({ id: decoded })

    /**
     * create 'user' property in res.locals object and store user id in it
     * then i can access to it in requireAdmin middleware for admin permission
     */
    res.locals.user = id

    next()
  } catch (error) {
    res.status(401).json({ message: 'Request isn\'t authorized' })
  }
}

export default requireAuth