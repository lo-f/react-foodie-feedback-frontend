import React from 'react'

const RatingReview = ({ rating, setRating }) => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star, idx) => {
        return (  
          <span
            className='start'
            style={{
              color: rating >= star ? 'gold' : 'gray',
              fontSize: `35px`,
            }}
            onClick={() => {
              setRating(star)
            }}
            key={idx}
          >
            {' '}
            ★{' '}
          </span>
        )
      })}
    </div>
  )
}

export default RatingReview;