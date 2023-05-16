import express, { json } from 'express'

import { router as authRouter } from './auth/auth.route'
import { router as usersRouter } from './users/users.route'
import errorHandler from './middlewares/errorHandler'

const app = express()

app.use(json())

app.use('/auth', authRouter)
app.use('/users', usersRouter)

app.use(errorHandler)

export default app