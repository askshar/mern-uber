import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import UserLogout from './pages/UserLogout'
import CaptainLogin from './pages/captainLogin'
import CaptainSignup from './pages/captainSignup'
import Start from './pages/Start'
import UserProtectRoute from './pages/UserProtectRoute'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectRoute from './pages/CaptainProtectRoute'
import CaptainLogout from './pages/CaptainLogout'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/home' element={
          <UserProtectRoute>
            <Home />
          </UserProtectRoute>
        } />

        // User routes
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/user/logout' element={
          <UserProtectRoute>
            <UserLogout />
          </UserProtectRoute>
        } />

        // Captain routes
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/captain-home' element={
          <CaptainProtectRoute>
            <CaptainHome />
          </CaptainProtectRoute>
        } />
        <Route path='/captain/logout' element={
          <CaptainProtectRoute>
            <CaptainLogout />
          </CaptainProtectRoute>
        } />
      </Routes>
    </>
  )
}

export default App
