const useInputValue = (dispatch: React.SetStateAction<any>) => {
  return {
    setState: (e: React.FormEvent<HTMLInputElement>) => {
      const { name, value, files } = e.target as HTMLInputElement & {
        files: FileList
      }

      dispatch((current: any) => ({
        ...current,
        [name]: files ? files[0] : value
      }))
    }
  }
}

export default useInputValue