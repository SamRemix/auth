import prisma from '../prisma'

const findUser = async (id: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id
    }
  })

  if (!data) {
    throw new Error('User not found, invalid id')
  }

  // only id & role are necessary for auth & admin permission
  return {
    id,
    role: data.role
  }
}

export default findUser