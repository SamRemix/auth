import { Prisma } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  const { status, message, code, meta } = err
  console.log(err)

  // prisma error
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(400).json({ code, message: meta?.cause || 'This prisma error is unhandled.' })

    /**
     * when i run command 'npx prisma db push' in terminal
     * and i get the error 'EPERM: operation not permitted'
     * reinstall @prisma/client dependency
     */
  }

  // express error
  res.status(status || 400).json({ message })
}

export default errorHandler