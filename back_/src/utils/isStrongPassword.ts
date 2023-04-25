const isStrongPassword = (password: string) => {
  let invalidRegExps: string[] = []
  let message = ''

  const regExps = [{
    regExp: /^.{8,}/,
    condition: '8 characters'
  }, {
    regExp: /[A-Z]/,
    condition: '1 uppercase character'
  }, {
    regExp: /[a-z]/,
    condition: '1 lowercase character'
  }, {
    regExp: /\d/,
    condition: '1 number'
  }, {
    regExp: /[^a-zA-Z\d]/,
    condition: '1 special character'
  }]

  regExps.map(({ regExp, condition }) => {
    if (!password.match(regExp)) {
      invalidRegExps.push(condition)

      if (invalidRegExps.length === 1) {
        return message = `Your password must contain at least ${condition}`
      }

      return message = 'Your password isn\'t strong enough'
    }
  })

  if (message) {
    throw new Error(message)
  }
}

export default isStrongPassword