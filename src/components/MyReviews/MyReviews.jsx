import { Link, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react"
import restaurantService from "../../services/restaurantService";
import ReviewForm from "../ReviewForm/ReviewForm";
 
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

    useEffect(() => {
        filterReviews();
    }, [user.username]);


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
            {editingReview ? (
                <ReviewForm 
                    review={editingReview}
                    onClose={handleCloseEditForm}
                />
            ) : 
            (userReviewObject.length > 0 ? (
            userReviewObject.map((review, idx) => (
                <div key={idx}>
                    <header>
                        <div id="reviewInfo">
                            <h2>{review.restaurant.name}</h2>
                            <p>{`${review.rating} stars`}</p>
                            <p>{review.text}</p>
                        </div>
                        <div id="buttons">
                            <button 
                                onClick={() => handleDeleteReview(review.restaurant._id, review._id)}>
                                Delete Review
                            </button>
                            <button onClick={() => handleEditClick(review)}>Edit Review</button>
                        </div>
                    </header>
                </div>
    

            ))
        ) : (
            <p>You haven't made any reviews!</p>
            )
        )}
        </main>
        </>
    )
}

export default MyReviews;