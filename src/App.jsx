import { useState, useEffect} from 'react'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import authService from './services/authservice'
import SigninForm from './components/SigninForm/SigninForm'
import SignupForm from './components/SignupForm/SignupForm'
import NavBar from './components/NavBar/NavBar'
import Landing from './components/Landing/Landing'
import RestaurantsList from './components/RestaurantsList/RestaurantsList'
import RestaurantForm from './components/RestaurantForm/RestaurantForm'
import MyReviews from './components/MyReviews/MyReviews'
import restaurantService from './services/restaurantService'


function App() {
  const [user, setUser] = useState(authService.getUser())
  const [restaurants, setRestaurants] = useState([])
  const [reviews, setReviews] = useState([])

  const navigate = useNavigate()

  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }

  const handleAddRestaurant = async (restaurantFormData) => {
    const newRestaurant = await restaurantService.create(restaurantFormData);
    setRestaurants([newRestaurant, ...restaurants]);
    navigate('/restaurants')
  };

  useEffect(() => {
    const fetchAllRestaurants = async () => {
      const restaurantsData = await restaurantService.index();
      setRestaurants(restaurantsData)
    };
    if (user) fetchAllRestaurants();
  }, [user])
  
  return (
    <>
    <NavBar user={user} handleSignout={handleSignout} />
    <Routes>
      <Route 
        path='/'
        element={<Landing user={user} />} />
      <Route 
        path='myreviews'
        element={<MyReviews reviews={reviews} user={user}/>}/>
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
        element={<RestaurantForm handleAddRestaurant={handleAddRestaurant}/>} />
    </Routes>
    </>
  )
}

export default App
