import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import restaurantService from "../../services/restaurantService"
import ReviewForm from "../ReviewForm/ReviewForm"
import { Link } from 'react-router-dom'


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

    return (
        <>
        <main>
            <section>
                <header>
                    <p>{restaurant.name.toUpperCase()}</p>
                </header>
            </section>
            <section>
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
                        <p>{review.text}</p>
                    </article>
                ))}
            </section>
        </main>
        </>
    )


}

export default RestaurantDetails