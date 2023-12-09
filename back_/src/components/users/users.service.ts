import prisma from '../../prisma'

import { compare, hash } from 'bcrypt'

import excludePassword from '../../utils/excludePassword'
import findUser from '../../utils/findUser'
import checkNameLength from '../../utils/checkNameLength'
import findUserByEmail from '../../utils/findUserByEmail'
import isEmail from '../../utils/isEmail'
import isStrongPassword from '../../utils/isStrongPassword'

type UserProps = {
  name: string
  email: string
}

type PasswordProps = {
  password: string
  newPassword: string
}

class UsersService {
  findAll = async () => {
    try {
      const users = await prisma.user.findMany({
        orderBy: { createdAt: 'asc' },
        select: excludePassword()
      })

      if (!users.length) {
        throw new Error('No users found')
      }

      return users
    } catch ({ message }: any) {
      throw new Error(message)
    }
  }

  findOne = async (id: string) => {
    try {
      return await findUser(id)
    } catch ({ message }: any) {
      throw new Error(message)
    }
  }

  update = async (id: string, { name, email }: UserProps) => {
    let newUser = {
      name: '',
      email: ''
    }

    try {
      const currentUser = await findUser(id)

      if ((name === currentUser.name) && (email === currentUser.email)) {
        return
      }

      if (name === currentUser.name) {
        newUser.name = currentUser.name
      } else {
        checkNameLength({
          string: name,
          range: [3, 32]
        })

        newUser.name = name
      }

      if (email === currentUser.email) {
        newUser.email = currentUser.email
      } else {
        const exists = await findUserByEmail(email)

        if (exists) {
          throw new Error('This email is already in use')
        }

        isEmail(email)

        newUser.email = email
      }

      const user = await prisma.user.update({
        where: { id },
        data: { ...newUser }
      })

      return {
        user,
        message: 'Successful update!'
      }
    } catch ({ message }: any) {
      throw new Error(message)
    }
  }

  updatePassword = async (id: string, { password, newPassword }: PasswordProps) => {
    try {
      const currentUser = await findUser(id)

      if (!password.trim() && !newPassword.trim()) {
        return
      }

      if (!password.trim() && newPassword) {
        throw new Error('Your current password is required')
      }

      if (password && !newPassword.trim()) {
        throw new Error('New password is required')
      }

      let hashedPassword = ''

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

      const user = await prisma.user.update({
        where: { id },
        data: { password: hashedPassword }
      })

      return {
        user,
        message: 'Password has been successfully updated 🔒'
      }
    } catch ({ message }: any) {
      throw new Error(message)
    }
  }

  remove = async (id: string) => {
    try {
      const user = await findUser(id)

      await prisma.user.delete({
        where: { id }
      })

      return {
        message: `You deleted ${user.name} account`
      }
    } catch ({ message }: any) {
      throw new Error(message)
    }
  }
}

export default UsersService