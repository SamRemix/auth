import 'dotenv/config'
const { PORT } = process.env

import app from './app'

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})