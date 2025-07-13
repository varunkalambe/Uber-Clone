import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Start from './pages/Start.jsx'
import UserLogin from './pages/UserLogin.jsx'
import UserSignup from './pages/UserSignup.jsx'
import Captainlogin from './pages/Captainlogin.jsx'
import CaptainSignup from './pages/CaptainSignup.jsx'
import Home from './pages/Home.jsx'
import UserProtectWrapper from './pages/UserProtectWrapper.jsx'
import UserLogout from './pages/UserLogout.jsx'
import CaptainHome from './pages/CaptainHome.jsx'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper.jsx'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin/>} />
        <Route path="/signup" element={<UserSignup/>} />
        <Route path="/captain-login" element={<Captainlogin/>} />
        <Route path="/captain-signup" element={<CaptainSignup/>} />
        <Route path="/home" 
          element={
          <UserProtectWrapper> 
            <Home />
          </UserProtectWrapper>}
          />
        <Route path="/user/logout" 
          element={
          <UserProtectWrapper> 
            <UserLogout />
          </UserProtectWrapper>}
          />
        <Route path="/captain-home" 
        element={
          <CaptainProtectWrapper> 
            <CaptainHome />
          </CaptainProtectWrapper>
        }/>
          
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  )
}

export default App
