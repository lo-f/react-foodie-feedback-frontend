import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
 
const MyReviews = (props) => {
    const { getAllReviews, user } = props;
    const [userReviewObject, setUserReviewObject] = useState([])

    const filterReviews = async () => {
        const reviewPropsArray = await getAllReviews();
        const userReviews = reviewPropsArray.filter(reviewObject => reviewObject.author === user._id);
        console.log(userReviews)
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
                <Link key={idx} to={`/myreviews/${review._id}`}>
                    <header>
                        <div>
                            <h2>{review.restaurant.name}</h2>
                            <p>{`${review.rating} stars`}</p>
                            <p>{review.text}</p>
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