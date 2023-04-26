import { Request, Response, NextFunction } from 'express'

const errorHandler = ({ message }: any, _req: Request, res: Response, _next: NextFunction) => (
  res.status(400).json({ message })
)

export default errorHandler