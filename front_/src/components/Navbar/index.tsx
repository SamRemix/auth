import './styles.scss'

import { NavLink } from 'react-router-dom'

import {
  HomeIcon,
  LockClosedIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline'

import useAuth from '../../hooks/useAuth'

const Navbar = () => {
  const { auth, logOut } = useAuth()

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
            <div className="link">
              <LockClosedIcon {...iconAttributs} />

              <p>Admin</p>
            </div>
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