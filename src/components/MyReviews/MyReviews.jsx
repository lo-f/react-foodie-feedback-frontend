import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import restaurantService from "../../services/restaurantService";
 
const MyReviews = (props) => {
    const { getAllReviews, user } = props;
    const [userReviewObject, setUserReviewObject] = useState([])

    const filterReviews = async () => {
        const reviewPropsArray = await getAllReviews();
        const userReviews = reviewPropsArray.filter(reviewObject => reviewObject.author === user._id);
        setUserReviewObject(userReviews);
    }

    useEffect(() => {
        filterReviews();
    }, [user.username]);

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
                            <button>Delete Review</button>
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