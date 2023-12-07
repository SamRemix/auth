import { Prisma } from '@prisma/client'

const excludePassword = () => {
  let result: { [key: string]: boolean } = {}

  for (const key in Prisma.UserScalarFieldEnum) {
    if (key !== 'password') {
      result[key] = true
    }
  }

  return result
}

export default excludePassword