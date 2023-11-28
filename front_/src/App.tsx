import {
  // createBrowserRouter,
  // createRoutesFromElements,
  Route,
  // RouterProvider,
  Routes,
  useLocation,
} from 'react-router-dom'

import { AnimatePresence } from 'framer-motion'

import Layout from './components/Layout'

import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Layout />}>
//       <Route index element={<Home />} />
//       <Route path="signup" element={<Signup />} />
//       <Route path="login" element={<Login />} />

//       <Route path="*" element={<NotFound />} />
//     </Route>
//   )
// )

const App = () => {
  const location = useLocation()

  return (
    <>
      <Layout />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
    // <RouterProvider router={router} />
  )
}

export default App
