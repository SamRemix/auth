import './styles.scss'

import { useContext, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import {
  HomeIcon,
  MusicalNoteIcon,
  UserIcon,
  ChevronDownIcon,
  LockClosedIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  UserPlusIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline'

import { AuthContext, AuthContextProps } from '../../contexts/AuthContext'

import useAuth from '../../hooks/useAuth'

const Navbar = () => {
  const { auth } = useContext(AuthContext) as AuthContextProps

  const [isOpen, setIsOpen] = useState(false)

  const { pathname } = useLocation()

  const { logOut } = useAuth()

  const isActiveLink = ['/admin', '/user'].some(path => (
    pathname.includes(path)
  ))

  const handleLogout = () => {
    setIsOpen(false)

    logOut()
  }

  const iconAttributs = {
    className: 'icon',
    width: '1.5rem',
    strokeWidth: 1.5
  }

  const chevronAttributs = {
    ...iconAttributs,
    width: '1.25rem'
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="link">
          <HomeIcon {...iconAttributs} />

          <p>Home</p>
        </NavLink>

        <NavLink to="/reviews" className="link">
          <MusicalNoteIcon {...iconAttributs} />

          <p>Reviews</p>
        </NavLink>
      </div>

      <div className="navbar-container">
        {auth?.token
          && (
            <div
              className={`${isActiveLink ? 'link active' : 'link auth-menu'}`}
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}>
              <UserIcon {...iconAttributs} />

              <p>{auth.user.name}</p>

              <ChevronDownIcon {...chevronAttributs} />

              {isOpen && (
                <div className="navbar-container-auth">
                  <div className="navbar-container-auth-user">
                    {auth.isAdmin
                      && (
                        <NavLink to="/admin" className="link">
                          <LockClosedIcon {...iconAttributs} />

                          <p>Admin</p>
                        </NavLink>
                      )}

                    <div className="link" onClick={handleLogout}>
                      <ArrowRightOnRectangleIcon {...iconAttributs} />

                      <p>Log out</p>
                    </div>
                  </div>

                  <div className="navbar-container-auth-settings">
                    <NavLink to="/settings/profile" className="link">
                      <Cog6ToothIcon {...iconAttributs} />

                      <p>Settings</p>
                    </NavLink>
                  </div>
                </div>
              )}
            </div>
          )}

        {!auth?.token
          && (
            <>
              <NavLink to="/signup" className="link">
                <UserPlusIcon {...iconAttributs} />

                <p>Sign up</p>
              </NavLink>

              <NavLink to="/login" className="link">
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