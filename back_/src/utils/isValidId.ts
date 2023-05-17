import prisma from '../prisma'

type PrismaModelProps = {
  [key: string]: any
}

type IsIdProps = {
  id: string,
  model: string,
  error?: string
}

const client: PrismaModelProps = prisma

const isValidId = async ({ id, model, error = 'Data not found' }: IsIdProps) => {
  const data = !!await client[model].findFirst({
    where: {
      id
    }
  })

  if (!data) {
    throw new Error(error)
  }
}

export default isValidId