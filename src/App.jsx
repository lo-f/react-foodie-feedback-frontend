
import { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import authService from "./services/authservice";
import SigninForm from "./components/SigninForm/SigninForm";
import SignupForm from "./components/SignupForm/SignupForm";
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import RestaurantsList from "./components/RestaurantsList/RestaurantsList";
import RestaurantForm from "./components/RestaurantForm/RestaurantForm";
import MyReviews from "./components/MyReviews/MyReviews";
import RestaurantDetails from "./components/RestaurantDetails/RestaurantDetails"
import restaurantService from "./services/restaurantService";
import Loading from './components/Loading/Loading'


function App() {
  const [user, setUser] = useState(authService.getUser());
  const [restaurants, setRestaurants] = useState([]);

  const getAllReviews = async () => {
    const reviewsArray = [];
    const restaurants = await restaurantService.index()
    restaurants.forEach(restaurant => {
      const restaurantReviews = restaurant.reviews;
      restaurantReviews.forEach(review => {
        reviewsArray.push(review)
      })
    })
    return reviewsArray
  }

  const navigate = useNavigate();

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  const handleAddRestaurant = async (restaurantFormData) => {

    const newRestaurant = await restaurantService.createRestaurant(restaurantFormData);
    setRestaurants([newRestaurant, ...restaurants]);
    navigate("/restaurants");
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
        {user ? (
          <>
            <Route path="/" element={<Landing user={user} />} />
            <Route
              path="myreviews"
              element={<MyReviews getAllReviews={getAllReviews} user={user} />}
            />
            <Route
              path="/restaurants"
              element={<RestaurantsList restaurants={restaurants} />}
            />
            <Route
              path="/restaurants/new"
              element={
                <RestaurantForm handleAddRestaurant={handleAddRestaurant} />
              }
            />
            <Route 
              path='/restaurants/:restaurantId'
              element={
                <RestaurantDetails user={user}/>
              }/>
          </>
        ) : (
          <>
            <Route path="/" element={<Landing user={user} />} />
            <Route path="/signin" element={<SigninForm setUser={setUser} />} />
            <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
