import { sign } from 'jsonwebtoken'

const createToken = (id: string) => (
  sign({ id }, process.env.SECRET as string, {
    expiresIn: '12h'
  })
)

export default createToken