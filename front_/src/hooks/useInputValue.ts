type TargetProps = {
  target: {
    name: string,
    value: string
  }
}

const useInputValue = (dispatch: React.SetStateAction<any>) => {
  const setState = ({ target }: TargetProps) => {
    const { name, value } = target

    dispatch((current: any) => ({
      ...current,
      [name]: value
    }))
  }

  return { setState }
}

export default useInputValue