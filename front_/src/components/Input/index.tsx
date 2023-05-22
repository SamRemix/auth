import './styles.scss'

import { useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

type InputProps = {
  type?: string,
  id?: string,
  label: string,
  name?: string,
  value: any,
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void,
  maxLength?: number,
  autoFocus?: boolean,
  passwordValidation?: boolean
}

const Input = ({
  type = 'text',
  id,
  label,
  value,
  name,
  onChange,
  maxLength,
  autoFocus = false,
}: InputProps) => {
  const [isDisplay, setIsDisplay] = useState(false)

  const defaultAttributs = {
    className: 'input',
    id,
    // placeholder,
    name,
    onChange,
    maxLength,
    autoFocus
  }

  const iconAttributs = {
    width: '1.5rem',
    strokeWidth: 1
  }

  return (
    <>
      {type === 'text' && (
        <div className="input-container">
          <label className="input-label" htmlFor={name}>{label}</label>
          <input value={value} {...defaultAttributs} />
        </div>
      )}

      {type === 'password' && (
        <div className="input-container">
          <label className="input-label" htmlFor={name}>{label}</label>
          <div className="input-content">
            <input value={value} type={isDisplay ? 'text' : 'password'} {...defaultAttributs} />

            <div className="input-content-icon" onClick={() => setIsDisplay(!isDisplay)}>
              {isDisplay
                ? <EyeSlashIcon {...iconAttributs} />
                : <EyeIcon {...iconAttributs} />}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Input