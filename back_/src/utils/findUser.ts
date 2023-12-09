import prisma from '../prisma'

const findUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id }
  })

  if (!user) {
    throw new Error('User not found')
  }

  return user
}

export default findUser