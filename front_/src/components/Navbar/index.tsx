import './styles.scss'

import { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import {
  HomeIcon,
  LockClosedIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline'

import { AuthContext, AuthContextProps } from '../../contexts/AuthContext'

import useAuth from '../../hooks/useAuth'

const Navbar = () => {
  const { auth } = useContext(AuthContext) as AuthContextProps

  const { logOut } = useAuth()

  const iconAttributs = {
    className: 'icon',
    width: '1.5rem',
    strokeWidth: 1.5
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="link">
          <HomeIcon {...iconAttributs} />

          <p>Home</p>
        </NavLink>
      </div>

      <div className="navbar-container">
        {auth?.isAdmin
          && (
            <NavLink to="/admin" className="link">
              <LockClosedIcon {...iconAttributs} />

              <p>Admin</p>
            </NavLink>
          )}

        {auth?.token
          ? (
            <div className="link logout" onClick={logOut}>
              <ArrowRightOnRectangleIcon {...iconAttributs} />

              <p>Log out</p>
            </div>
          )
          : (
            <>
              <NavLink to="signup" className="link">
                <UserPlusIcon {...iconAttributs} />

                <p>Sign up</p>
              </NavLink>

              <NavLink to="login" className="link">
                <ArrowLeftOnRectangleIcon {...iconAttributs} />

                <p>Log in</p>
              </NavLink>
            </>
          )}
      </div>
    </nav>
  )
}

export default Navbar