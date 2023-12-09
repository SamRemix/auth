import './styles.scss'

import { useState } from 'react'

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

type InputProps = {
  type?: string
  id?: string
  label: string
  name?: string
  value: any
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  maxLength?: number
  autoFocus?: boolean
}

const Input = ({
  type = 'text',
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
    id: name,
    name,
    onChange,
    maxLength,
    autoFocus,
    autoComplete: 'off' // fix autoComplete issue in the navigator
  }

  const iconAttributs = {
    width: '1.5rem',
    strokeWidth: 1
  }

  return (
    <>
      {type === 'text' && (
        <label className="input-label" htmlFor={name}>
          <p>{label}</p>

          <input value={value} {...defaultAttributs} />
        </label>
      )}

      {type === 'password' && (
        <label className="input-label" htmlFor={name}>
          <p>{label}</p>

          <div className="input-content">
            <input value={value} type={isDisplay ? 'text' : 'password'} {...defaultAttributs} />

            <div className="input-content-icon" onClick={() => setIsDisplay(!isDisplay)}>
              {isDisplay
                ? <EyeSlashIcon {...iconAttributs} />
                : <EyeIcon {...iconAttributs} />}
            </div>
          </div>
        </label>
      )}

      {type === 'date' && (
        <label className="input-label" htmlFor={name}>
          <p>{label}</p>

          <input value={value} type="date" {...defaultAttributs} />
        </label>
      )}
    </>
  )
}

export default Input