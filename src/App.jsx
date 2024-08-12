import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import * as authService from './services/authservice'
import SigninForm from './components/SigninForm/SigninForm'
import SignupForm from './components/SignupForm/SignupForm'
import NavBar from './components/NavBar/NavBar'
import Landing from './components/Landing/Landing'


function App() {
  const [user, setUser] = useState(authService.getUser())

  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }

  return (
    <>
    <NavBar user={user} handleSignout={handleSignout} />
    <Routes>
      <Route 
        path='/'
        element={<Landing user={user} />} />
      <Route
        path='/signin' 
        element={<SigninForm setUser={setUser}/>} />
      <Route
        path='/signup'
        element={<SignupForm setUser={setUser}/>} />
    </Routes>
    </>
  )
}

export default App
