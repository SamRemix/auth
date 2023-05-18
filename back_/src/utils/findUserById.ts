import prisma from '../prisma'

const findUserById = async (id: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id
    }
  })

  if (!data) {
    throw new Error('User not found, invalid id')
  }

  return data
}

export default findUserById