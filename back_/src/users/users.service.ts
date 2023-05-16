import prisma from '../prisma'

export const findAllService = async () => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    return users
  } catch ({ message }: any) {
    throw new Error(message)
  }
}