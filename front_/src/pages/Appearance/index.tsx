import './styles.scss'

import transition from '../../transition/transition'

import { useState } from 'react'

import Container from '../../components/Container'

import useTheme from '../../hooks/useTheme'

const Profile = () => {
  const { theme, setTheme } = useTheme()

  const [selected, setSelected] = useState(theme)

  const themes = [{
    id: 1,
    name: 'Light red',
    theme: 'Red'
  }, {
    id: 2,
    name: 'Light blue',
    theme: 'Blue'
  }]

  return (
    <Container title="Appearance" settingsPage={true}>
      <div className="themes">
        {themes.map(({ id, name, theme }) => (
          <div key={id} className="theme">
            <p>{name}</p>
            <div
              className={`theme-colors ${theme} ${selected === theme ? 'test' : ''}`}
              onClick={() => {
                setSelected(theme)
                setTheme(theme)
              }} />
          </div>
        ))}
      </div>
    </Container>
  )
}

export default transition(Profile)