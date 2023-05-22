import './styles.scss'

import { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { AuthContext, AuthContextProps } from '../../contexts/AuthContext'

const Navbar = () => {
  const { auth, logOut } = useContext(AuthContext) as AuthContextProps

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="link">
          <p>Home</p>
        </NavLink>
      </div>

      <div className="navbar-container">
        {auth?.isAdmin
          && (
            <div className="link">
              <p>Admin</p>
            </div>
          )}

        {auth?.token
          ? (
            <div className="link logout" onClick={logOut}>
              <p>Log out</p>
            </div>
          )
          : (
            <>
              <NavLink to="signup" className="link">
                <p>Sign up</p>
              </NavLink>
              <NavLink to="login" className="link">
                <p>Log in</p>
              </NavLink>
            </>
          )}
      </div>
    </nav>
  )
}

export default Navbar