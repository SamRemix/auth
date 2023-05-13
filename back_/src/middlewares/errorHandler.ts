import { Request, Response, NextFunction } from 'express'

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err)

  res.status(400).json({ message: err.message })
}

export default errorHandler