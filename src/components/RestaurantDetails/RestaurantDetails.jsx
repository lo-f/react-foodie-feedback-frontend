import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import restaurantService from "../../services/restaurantService.js"
import ReviewForm from "../ReviewForm/ReviewForm"
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading/Loading.jsx'


const RestaurantDetails = (props) => {
    const { restaurantId } = useParams();

    console.log('restaurantId:', restaurantId)

    const [restaurant, setRestaurant] = useState(null)

    useEffect(() => {
        const fetchRestaurant = async () => {
            const restaurantData = await restaurantService.show(restaurantId);
            setRestaurant(restaurantData)
            console.log('restaurantData:', restaurantData)
        }
        fetchRestaurant();
    }, [restaurantId]);

    const handleAddReview = async (reviewFormData) => {
        const newReview = await restaurantService.createReview(restaurantId, reviewFormData);
        setRestaurant({...restaurant, reviews: [...restaurant.reviews, newReview]})
    }

    if (!restaurant) return <Loading />;

    return (
        <main>
            <section>
                <header>
                    <p>{restaurant.name}</p>
                </header>
            </section>
            {/* <section>
                <h2>Reviews</h2>
                <ReviewForm handleAddReview={handleAddReview} />
                {!restaurant.reviews.length && <p>No reviews for this restaurant!</p>}

                {restaurant.reviews.map((review) => (
                    <article key={review._id}>
                        <header>
                            <div>
                                {review.author._id === user._id && (
                                    <>
                                    
                                    </>
                                )}
                            </div>
                        </header>
                    </article>
                ))}
                <p>{review.text}</p>
            </section> */}
        </main>
    )
}

export default RestaurantDetails;