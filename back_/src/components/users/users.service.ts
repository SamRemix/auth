import prisma from '../../prisma'

import { compare, hash } from 'bcrypt'

import checkLength from '../../utils/checkLength'
import findUser from '../../utils/findUser'
import isEmail from '../../utils/isEmail'
import isStrongPassword from '../../utils/isStrongPassword'

type NewUserDataProps = {
  name: string,
  email: string,
  password: string,
  newPassword: string
}

class UsersService {
  findAll = async () => {
    try {
      const users = await prisma.user.findMany({
        orderBy: {
          createdAt: 'asc'
        }
      })

      if (users.length === 0) {
        throw new Error('No users found')
      }

      return users
    } catch ({ message }: any) {
      throw new Error(message)
    }
  }

  findOne = async (id: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id
        }
      })

      if (!user) {
        throw new Error('User not found')
      }

      return user
    } catch ({ message }: any) {
      throw new Error(message)
    }
  }

  update = async (id: string, newUserData: NewUserDataProps) => {
    const { name, email, password, newPassword } = newUserData

    try {
      const currentUser = await prisma.user.findUnique({
        where: {
          id
        }
      })

      if (!currentUser) {
        throw new Error('User not found')
      }

      if (name) {
        checkLength({
          string: name,
          range: [3, 32],
          prefix: 'Your name'
        })
      }

      if (email) {
        if (email === currentUser.email) {
          throw new Error('This email is already yours')
        }

        const exists = await findUser({ email })

        if (exists) {
          throw new Error('This email is already in use')
        }

        isEmail(email)
      }

      let hashedPassword

      if (!password && newPassword) {
        throw new Error('Your current password is required')
      }

      if (password && newPassword) {
        const match = await compare(password, currentUser.password)

        if (!match) {
          throw new Error('Incorrect password')
        }

        if (password === newPassword) {
          throw new Error('The passwords are the same')
        }

        isStrongPassword(newPassword)

        hashedPassword = await hash(newPassword, 10)
      }

      return await prisma.user.update({
        where: {
          id
        },
        data: {
          name: name || currentUser.name,
          email: email || currentUser.email,
          password: hashedPassword || currentUser.password
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