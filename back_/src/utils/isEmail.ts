const isEmail = (email: string) => {
  const regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  if (!email.toLowerCase().match(regExp)) {
    throw new Error('Your email is invalid')
  }
}

export default isEmail