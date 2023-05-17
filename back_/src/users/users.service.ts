import prisma from '../prisma'

class UsersService {
  findAll = async () => {
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
}

export default UsersService