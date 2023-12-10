const isEmpty = (body: { [key: string]: any }) => {
  let emptyFields: string[] = []
  let error = ''

  Object.entries(body).map(([key, value]) => {
    if (!value?.trim()) {
      emptyFields.push(key)

      if (emptyFields.length === 1) {
        return error = `You must fill in the "${key}" field`
      }

      error = 'You must fill all the fields'
    }
  })

  if (error) {
    throw new Error(error)
  }
}

export default isEmpty