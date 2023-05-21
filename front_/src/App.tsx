import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

import Home from './pages/Home'

import Signup from './pages/Signup'
import Login from './pages/Login'
import Layout from './components/Layout'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
    </Route>
  )
)

const App = () => <RouterProvider router={router} />

export default App
