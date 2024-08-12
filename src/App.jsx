import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import authService from './services/authservice'
import SigninForm from './components/SigninForm/SigninForm'
import SignupForm from './components/SignupForm/SignupForm'
import NavBar from './components/NavBar/NavBar'
import Landing from './components/Landing/Landing'
import RestaurantsList from './components/RestaurantsList/RestaurantsList'
import RestaurantForm from './components/RestaurantForm/RestaurantForm'


function App() {
  const [user, setUser] = useState(authService.getUser())
  const [restaurants, setRestaurants] = useState([])

  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }

  const handleChange = () => {
    
  }

  return (
    <>
    <NavBar user={user} handleSignout={handleSignout} />
    <Routes>
      <Route 
        path='/'
        element={<Landing user={user} />} />
      <Route
        path='/restaurants'
        element={<RestaurantsList restaurants={restaurants}/>}/>
      <Route
        path='/signin' 
        element={<SigninForm setUser={setUser}/>} />
      <Route
        path='/signup'
        element={<SignupForm setUser={setUser}/>} />
      <Route 
        path='/restaurants/new'
        element={<RestaurantForm />} />
    </Routes>
    </>
  )
}

export default App
