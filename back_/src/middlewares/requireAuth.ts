import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import findUserById from '../utils/findUserById'

const requireAuth = async ({ headers }: Request, res: Response, next: NextFunction) => {
  const { authorization } = headers

  if (!authorization) {
    return res.status(401).json({ message: 'Authorization token required' })
  }

  // remove the token prefix ('Bearer ')
  const token = authorization.split(' ')[1]

  try {
    const decoded = verify(token, process.env.SECRET as string) as string

    const { id } = await findUserById(decoded)

    res.locals.user = id

    next()
  } catch ({ message }: any) {
    res.status(401).json({ message: 'Request isn\'t authorized' })
  }
}

export default requireAuth