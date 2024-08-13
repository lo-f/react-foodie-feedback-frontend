
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
import ReviewForm from "./components/ReviewForm/ReviewForm";
import Loading from './components/Loading/Loading'


function App() {
  const [user, setUser] = useState(authService.getUser());
  const [restaurants, setRestaurants] = useState([]);
  const [currentReviewData, setCurrentReviewData] = useState(null)

  const getAllReviews = async () => {
    const reviewPropertiesArray = [];
    const restaurants = await restaurantService.index()
    restaurants.forEach(restaurant => {
      const restaurantReviews = restaurant.reviews;
      restaurantReviews.forEach(review => {
        reviewPropertiesArray.push(
          { text: review.text, 
            _id: review._id,
          rating: review.rating,
          restaurant: restaurant,
          author: review.author
        })
      })
    })
    return reviewPropertiesArray
  }

  const navigate = useNavigate();

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  const handleDeleteRestaurant = async (restaurantId) => {
    const deletedRestaurant = await restaurantService.deleteRestaurant(restaurantId)
    setRestaurants(restaurants.filter((restaurant) => restaurant._id !== restaurantId))
    navigate('/restaurants')
  }

  const handleAddRestaurant = async (restaurantFormData) => {
    const newRestaurant = await restaurantService.createRestaurant(restaurantFormData);
    setRestaurants([newRestaurant, ...restaurants]);
    navigate("/restaurants");
  };

  const handleEditRestaurant = async (restaurantId, restaurantFormData) => {
    const editRestaurant = await restaurantService.editRestaurant(restaurantId, restaurantFormData);
    setRestaurants(restaurants.map((restaurant) => (restaurantId === restaurant._id ? editRestaurant : restaurant)))
    navigate(`/restaurants/${restaurantId}`)
  }

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
              path="/myreviews"
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
                <RestaurantDetails user={user} handleDeleteRestaurant={handleDeleteRestaurant}/>
              }/>
            <Route 
              path="/restaurants/:restaurantId/edit"
              element={
                <RestaurantForm handleEditRestaurant={handleEditRestaurant} />
              }
              />
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
