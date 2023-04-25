import express, { json } from 'express'

import { router } from './auth/auth.route'

const app = express()

app.use(json())

app.use('/auth', router)

export default app