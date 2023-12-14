import { Outlet } from 'react-router-dom'

import NavbarSettings from '../NavbarSettings'

const LayoutSettings = () => (
  <>
    <NavbarSettings />
    <Outlet />
  </>
)

export default LayoutSettings