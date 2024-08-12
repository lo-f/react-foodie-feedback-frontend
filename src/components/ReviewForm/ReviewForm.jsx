import React, { useState } from 'react';

const ReviewForm = () => {
    const [review, setReview] = useState({
        rating: '',
        text: '',
    });
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
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
