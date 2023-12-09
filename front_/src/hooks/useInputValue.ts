type TargetProps = {
  target: {
    name: string
    value: string
  }
}

const useInputValue = (dispatch: React.SetStateAction<any>) => {
  return {
    setState: ({ target }: TargetProps) => {
      const { name, value } = target

      dispatch((current: any) => ({
        ...current,
        [name]: value
      }))
    }
  }
}

export default useInputValue