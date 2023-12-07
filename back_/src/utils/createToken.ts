import { sign } from 'jsonwebtoken'

const createToken = (id: string) => (
  sign({ id }, process.env.SECRET as string)
)

export default createToken