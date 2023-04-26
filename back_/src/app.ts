import express, { json } from 'express'

import { router } from './auth/auth.route'
import errorHandler from './middlewares/errorHandler'

const app = express()

app.use(json())

app.use('/auth', router)

app.use(errorHandler)

export default app