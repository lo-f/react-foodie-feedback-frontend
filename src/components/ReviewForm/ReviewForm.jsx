import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import restaurantService from '../../services/restaurantService';

const ReviewForm = (props) => {
    const [review, setReview] = useState({
        rating: '',
        text: '',
    });

    const { restaurantId, reviewId } = useParams()


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
            restaurantService.updateReview(restaurantId, reviewId, review)
        } else {
            props.handleAddReview(review);
        }
        setReview({ text: '', rating: '', })
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='rating'>Rating: </label>
            <select 
                value={review.rating} 
                onChange={handleChange} 
                id='rating'
                name='rating'
                className='reviewFormField'>
                    <option value="">Select a rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
            </select>
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
    );
};

export default ReviewForm;
