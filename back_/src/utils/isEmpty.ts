const isEmpty = (body: { [key: string]: any }) => {
  let emptyFields: string[] = []
  let message = ''

  Object.entries(body).map(([key, value]) => {
    if (!value || value.trim().length === 0) {
      emptyFields.push(key)

      if (emptyFields.length === 1) {
        return message = `You must fill in the "${key}" field`
      }

      return message = 'You must fill all the fields'
    }
  })

  return { fieldsError: message }
}

export default isEmpty