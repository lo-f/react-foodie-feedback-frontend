import { Link, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react"
import restaurantService from "../../services/restaurantService";
 
const MyReviews = (props) => {
    const { getAllReviews, user } = props;
    const navigate = useNavigate();
    const [userReviewObject, setUserReviewObject] = useState([])

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
        await restaurantService.deleteReview(restaurantId, reviewId)
        navigate('/myreviews')
    }

    return(
        <>
        <main>
            {userReviewObject.length > 0 ? (
            userReviewObject.map((review, idx) => (
                <Link key={idx} to={`/restaurants/${review.restaurant._id}`}>
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
                            <Link to={`/${review._id}/edit`}>Edit Review</Link>
                        </div>
                    </header>
                </Link>

            ))
        ) : (
            <p>You haven't made any reviews!</p>
        )}
        </main>
        </>
    )
}

export default MyReviews;