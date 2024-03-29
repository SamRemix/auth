import { useContext } from 'react'
import { Navigate, Route, Routes, useLocation, } from 'react-router-dom'

import { AnimatePresence } from 'framer-motion'

import { AuthContext, AuthContextProps } from './contexts/AuthContext'

import Layout from './components/Layout'
import LayoutSettings from './components/LayoutSettings'

import Home from './pages/Home'
import Reviews from './pages/Reviews'
import Album from './pages/Album'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Appearance from './pages/Appearance'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'

const App = () => {
  const location = useLocation()

  const { auth } = useContext(AuthContext) as AuthContextProps

  return (
    <>
      <Layout />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home />} />

          <Route path="reviews" element={<Reviews />} />

          <Route path="reviews/:id" element={<Album />} />

          <Route path="signup" element={
            !auth
              ? <Signup />
              : <Navigate to="/" />
          } />

          <Route path="login" element={
            !auth
              ? <Login />
              : <Navigate to="/" />
          } />

          <Route path="settings" element={
            auth
              ? <LayoutSettings />
              : <NotFound />}>
            <Route path="profile" element={<Profile />} />
            <Route path="appearance" element={<Appearance />} />
          </Route>

          <Route path="admin" element={
            auth?.isAdmin
              ? <Admin />
              : <NotFound />
          } />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
