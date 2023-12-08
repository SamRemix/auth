import express, { json } from 'express'
import cors from 'cors'

import authRouter from './components/auth/auth.route'
import usersRouter from './components/users/users.route'
import albumsRouter from './components/albums/albums.route'

import errorHandler from './middlewares/errorHandler'

const app = express()

app.use(json())
app.use(cors())

app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/albums', albumsRouter)

app.use(errorHandler)

export default app