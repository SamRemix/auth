import { Prisma } from '@prisma/client'

const excludePassword = () => {
  let result: { [key: string]: any } = {}

  for (const key in Prisma.UserScalarFieldEnum) {
    if ('password' !== key) {
      result[key] = true
    }
  }
  return result
}

export default excludePassword