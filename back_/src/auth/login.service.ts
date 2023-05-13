import { compare } from "bcrypt"
import createToken from "../utils/createToken"
import findUserByEmail from "../utils/findUserByEmail"
import isEmpty from "../utils/isEmpty"

const logInService = async (currentUser: any) => {
  const { email, password } = currentUser

  try {
    isEmpty({ email, password })

    const user = await findUserByEmail(email)

    if (!user) {
      throw new Error('This email does not exist')
    }

    const match = await compare(password, user.password)

    if (!match) {
      throw new Error('Your password is incorrect')
    }

    const token = createToken(user.id)

    return { user, token }
  } catch ({ message }: any) {
    throw new Error(message)
  }
}

export default logInService