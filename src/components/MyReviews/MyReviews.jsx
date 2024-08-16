import { Link, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react"
import restaurantService from "../../services/restaurantService";
import ReviewForm from "../ReviewForm/ReviewForm";
import RatingReview from "../RatingReview/RatingReview";
import './MyReviews.css'
 
const MyReviews = (props) => {
    const { getAllReviews, user } = props;
    const navigate = useNavigate();
    const [userReviewObject, setUserReviewObject] = useState([])
    const [editingReview, setEditingReview] = useState(null)

    const filterReviews = async () => {
        const reviewPropsArray = await getAllReviews();
        const userReviews = reviewPropsArray.filter(reviewObject => {
            return reviewObject.author === user._id});
        setUserReviewObject(userReviews);
    }

    const setRating = () => {};

    useEffect(() => {
        filterReviews();
    }, [user.username]);

    const handleAddReview = async (restaurantId, reviewId, reviewData) => {
        restaurantService.editReview(restaurant._id, review._id, reviewData)
    }

    const handleDeleteReview = async (restaurantId, reviewId) => {
        const deletedReview = await restaurantService.deleteReview(restaurantId, reviewId)
        setUserReviewObject(userReviewObject.filter((review) => review._id !== reviewId))
        navigate('/myreviews')
    }

    const handleEditClick = (review) => {
        setEditingReview(review)
    }

    const handleCloseEditForm = () => {
        setEditingReview(null)
    };

    return(
        <>
        <main>
            <header id="myReviewHeader">
                <h1>My Reviews</h1>
            </header>
            <div className="reviewContainer">
            {editingReview ? (
                <ReviewForm 
                    review={editingReview}
                    onClose={handleCloseEditForm}
                />
            ) : 
            (userReviewObject.length > 0 ? (
            userReviewObject.map((review, idx) => (
                <div key={idx} className="reviewCard">
                    <header>
                        {editingReview ? (
                            <ReviewForm 
                                review={editingReview}
                                handleAddReview={handleAddReview}
                                onSave={() => {filterReviews()}}/>
                            
                        ) : (<div id="reviewInfo">
                            <h2>{review.restaurant.name}</h2>
                            <RatingReview rating={review.rating} setRating={setRating}/>
                            <p>{review.text}</p>
                        <div id="buttons">
                            <Link to={`/restaurants/${review.restaurant._id}/reviews/${review._id}/edit`} className='link'>Edit Review</Link>
                            <button 
                                onClick={() => handleDeleteReview(review.restaurant._id, review._id)}>
                                Delete Review
                            </button>
                        </div>
                        </div>)}
                    </header>
                </div>
    

            ))
        ) : (
            <p>You haven't made any reviews!</p>
            )
        )}
        </div>
        </main>
        </>
    )
}

export default MyReviews;