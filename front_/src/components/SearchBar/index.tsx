import Input from '../Input'

type SearchBarProps = {
  label: string
  prefix: string
  setPrefix: React.Dispatch<React.SetStateAction<string>>
}

const SearchBar = ({ label, prefix, setPrefix }: SearchBarProps) => (
  <Input
    type="search"
    label={label}
    name="search"
    value={prefix}
    onChange={({ target }) => (
      setPrefix(target.value)
    )}
  />
)


export default SearchBar