type CheckLengthProps = {
  string: string,
  range: number[],
  prefix?: string
}

const checkLength = ({ string, range, prefix = 'The field' }: CheckLengthProps) => {
  if (string.trim().length < range[0]) {
    throw new Error(`${prefix} must contain at least ${range[0]} character${range[0] === 1 ? '' : 's'}`)
  }

  if (string.trim().length > range[1]) {
    throw new Error(`${prefix} must not exceed ${range[1]} characters`)
  }
}

export default checkLength