import './styles.scss'

import { useState } from 'react'

import {
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon,
  ArrowUpTrayIcon
} from '@heroicons/react/24/outline'

type InputProps = {
  type?: string
  label: string
  value?: string
  name?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  autoFocus?: boolean
  file?: string
}

const Input = ({
  type = 'text',
  label,
  value,
  name,
  onChange,
  autoFocus = false,
  file
}: InputProps) => {
  const [isDisplay, setIsDisplay] = useState(false)

  const defaultAttributs = {
    className: 'input',
    id: name || 'input',
    name,
    onChange,
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

      {type === 'search' && (
        <div className="search-bar">
          <div className="input-search">
            <input value={value} placeholder={label} {...defaultAttributs} />

            <div className="input-search-icon">
              <MagnifyingGlassIcon width="1.5em" />
            </div>
          </div>
        </div>
      )}

      {type === 'file' && (
        <div className="input-file">
          <p>{label}</p>

          <label className="input-file-label" htmlFor={name}>
            <p className="file-name">{file ? file : 'Choose a file'}</p>

            <div className="input-file-icon">
              <ArrowUpTrayIcon width="1.5em" />
            </div>
          </label>

          <input accept="image/png, image/jpeg" type="file" {...defaultAttributs} />
        </div>
      )}

      {type.includes('update') && (
        <label className="input-label" htmlFor={name}>
          <p>{label}</p>

          <input
            defaultValue={value}
            type={type.split('-')[1]}
            {...defaultAttributs}
          />
        </label>
      )}
    </>
  )
}

export default Input