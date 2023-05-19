import prisma from '../prisma'

const findUserByEmail = async (email: string) => (
  await prisma.user.findUnique({
    where: {
      email
    }
  })
)

export default findUserByEmail