import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import findUser from '../utils/findUser'

const requireAuth = async ({ headers }: Request, { locals }: Response, next: NextFunction) => {
  const { authorization } = headers

  try {
    if (!authorization) {
      throw new Error('You\'re not authorized to access this resource, you must authenticate.')
    }

    const decoded: any = verify(authorization, process.env.SECRET as string, (err, decoded) => {
      if (err) {
        console.log(err.name)

        throw new Error(`Request isn't authorized, ${err.message}.`)
      }

      return decoded
    })

    const { id } = await findUser(decoded.id)

    /**
     * create 'user' property in res.locals object and store user id in it
     * then i can access to it in requireAdmin middleware for admin permission
     */
    locals.user = id

    next()
  } catch ({ message }: any) {
    next({ status: 401, message })
  }
}

export default requireAuth