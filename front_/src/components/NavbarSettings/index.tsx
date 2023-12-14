import './styles.scss'

import { NavLink } from 'react-router-dom'

import {
  UserIcon,
  PaintBrushIcon
} from '@heroicons/react/24/outline'

const NavbarSettings = () => {
  const iconAttributs = {
    className: 'icon',
    width: '1.5rem',
    strokeWidth: 1.5
  }

  return (
    <div className="navbar-settings">
      <div className="navbar-settings-container">
        <NavLink to="/settings/profile" className="link">
          <UserIcon {...iconAttributs} />

          <p>Profile</p>
        </NavLink>

        <NavLink to="/settings/appearance" className="link">
          <PaintBrushIcon {...iconAttributs} />

          <p>Appearance</p>
        </NavLink>
      </div>
    </div>
  )
}

export default NavbarSettings