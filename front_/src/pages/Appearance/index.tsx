import './styles.scss'

import transition from '../../transition/transition'

import { useContext, useState } from 'react'

import { ThemeContext } from '../../contexts/ThemeContext'

import Container from '../../components/Container'

const Profile = () => {
  const { theme, setTheme } = useContext(ThemeContext)

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