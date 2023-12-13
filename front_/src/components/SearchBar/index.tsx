import Input from '../Input'

type SearchBarProps = {
  prefix: string
  setPrefix: React.Dispatch<React.SetStateAction<string>>
}

const SearchBar = ({ prefix, setPrefix }: SearchBarProps) => (
  <Input
    type="search"
    value={prefix}
    onChange={({ target }) => (
      setPrefix(target.value)
    )}
  />
)


export default SearchBar