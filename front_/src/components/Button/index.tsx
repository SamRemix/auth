import './styles.scss'

type ButtonProps = {
  type?: string
  disabled?: boolean
  onClick?: () => void
  children?: React.ReactNode
}

const Button = ({ type = 'primary', onClick, disabled, children }: ButtonProps) => (
  <button className={type} disabled={disabled} onClick={onClick}>
    {children}
  </button>
)

export default Button