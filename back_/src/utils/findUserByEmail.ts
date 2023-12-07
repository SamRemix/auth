import prisma from '../prisma'

const findUserByEmail = async (email: string) => (
  await prisma.user.findUnique({
    where: {
      email: email.toLowerCase()
    }
  })
)

export default findUserByEmail