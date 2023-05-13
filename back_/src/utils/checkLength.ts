type CheckLengthProps = {
  string: string,
  min: number,
  max: number,
  prefix: string
}

const checkLength = ({ string, min, max, prefix }: CheckLengthProps) => {
  if (string.trim().length < min) {
    throw new Error(`${prefix} must contain at least ${min} character${min === 1 ? '' : 's'}`)
  }

  if (string.trim().length > max) {
    throw new Error(`${prefix} must not exceed ${max} characters`)
  }
}

export default checkLength