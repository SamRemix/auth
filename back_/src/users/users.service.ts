import prisma from '../prisma'

class UsersService {
  findAll = async () => {
    try {
      return await prisma.user.findMany({
        orderBy: {
          name: 'asc'
        }
      })
    } catch ({ message }: any) {
      throw new Error(message)
    }
  }

  remove = async (id: string) => {
    try {
      return await prisma.user.delete({
        where: {
          id
        }
      })
    } catch ({ message }: any) {
      throw new Error(message)
    }
  }
}

export default UsersService