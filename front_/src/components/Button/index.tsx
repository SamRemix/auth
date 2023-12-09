import './styles.scss'

type ButtonProps = {
  type?: string
  onClick?: () => void
  children?: React.ReactNode
  animate?: object
}

const Button = ({ type = 'primary', onClick, children }: ButtonProps) => (
  <button className={type} onClick={onClick}>
    {children}
  </button>
)

export default Button