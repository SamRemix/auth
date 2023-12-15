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
    value={prefix}
    onChange={({ target }) => (
      setPrefix(target.value)
    )}
    autoFocus={true}
  />
)


export default SearchBar