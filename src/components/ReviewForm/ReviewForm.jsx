import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, } from 'react-router-dom'
import restaurantService from '../../services/restaurantService';
import RatingReview from '../RatingReview/RatingReview';
import './ReviewForm.css'

const ReviewForm = (props) => {
    const [review, setReview] = useState({
        rating: '',
        text: '',
    });

    const setRating = (rating) => {
        setReview({rating: rating, text: review.text})
    }

    const { restaurantId, reviewId } = useParams()

    

    const navigate = useNavigate()

    useEffect(() => {
        const fetchRestaurant = async () => {
            const restaurantData = await restaurantService.show(restaurantId);
            setReview(restaurantData.reviews.find((review) => review._id === reviewId))
        };
        if (restaurantId && reviewId) fetchRestaurant();
    }, [restaurantId, reviewId])

    const handleChange = (e) => {
        setReview({ ...review, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (restaurantId && reviewId) {
            try{
            restaurantService.editReview(restaurantId, reviewId, review);
            navigate(-1)
            } catch (error) {
                console.error('Error editing review:', error)
            }

        } else {
            props.handleAddReview(review);
        }
        setReview({ text: '', rating: '', })
    };

    return (
        <>

        <form onSubmit={handleSubmit}>
        <h2>Write a Review!</h2>
            <RatingReview rating={review.rating} setRating={setRating}/>
            <br />
            <label htmlFor='text'>Write your review: </label>
            <textarea 
                value={review.text} 
                onChange={handleChange}
                id='text'
                name='text'
                className='reviewFormField' />
            <br />
            <button type="submit">Submit</button>
        </form>
        </>
    );
};

export default ReviewForm;
