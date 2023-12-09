type CheckLengthProps = {
  string: string
  range: [number, number]
}

const checkNameLength = ({ string, range }: CheckLengthProps) => {
  if (string.trim().length < range[0]) {
    throw new Error(`Your name must contain at least ${range[0]} characters`)
  }

  if (string.trim().length > range[1]) {
    throw new Error(`Your name must not exceed ${range[1]} characters`)
  }
}

export default checkNameLength