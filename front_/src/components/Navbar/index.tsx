import './styles.scss'

import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="link">
          <p>Home</p>
        </NavLink>
      </div>
      <div className="navbar-container">
        <NavLink to="signup" className="link">
          <p>Sign up</p>
        </NavLink>
        <NavLink to="login" className="link">
          <p>Log in</p>
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar