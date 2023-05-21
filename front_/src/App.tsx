import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

import Layout from './components/Layout'

import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

const App = () => <RouterProvider router={router} />

export default App
