const isStrongPassword = (password: string) => {
  let invalidRegExps: string[] = []
  let error = ''

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
        return error = `Your password must contain at least ${condition}`
      }

      error = 'Your password isn\'t strong enough'
    }
  })

  if (error) {
    throw new Error(error)
  }
}

export default isStrongPassword