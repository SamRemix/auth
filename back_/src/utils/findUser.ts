import prisma from '../prisma'

type FindUserProps = {
  id?: string,
  email?: string
}

const findUser = async (params: FindUserProps) => {
  if (Object.keys(params).length !== 1) {
    throw new Error('findUser must contain only 1 argument')
  }

  const data = await prisma.user.findUnique({
    where: {
      ...params
    }
  })

  if (!data) {
    throw new Error('User not found, invalid id')
  }

  return data
}

export default findUser