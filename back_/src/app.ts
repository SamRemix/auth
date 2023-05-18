import express, { json } from 'express'

import authRouter from './components/auth/auth.route'
import usersRouter from './components/users/users.route'

import errorHandler from './middlewares/errorHandler'

const app = express()

app.use(json())

app.use('/auth', authRouter)
app.use('/users', usersRouter)

app.use(errorHandler)

export default app