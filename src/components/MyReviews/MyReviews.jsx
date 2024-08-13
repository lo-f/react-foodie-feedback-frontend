import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
 
const MyReviews = (props) => {
    const { getAllReviews, user } = props;
    const [userReviews, setUserReviews] = useState([])

    const filterReviews = async () => {
        const reviews = await getAllReviews();
        const userReviews = reviews.filter(review => review.author === user._id);
        console.log(userReviews)
        setUserReviews(userReviews);
    }
    

    useEffect(() => {
        filterReviews();
    }, [user.username]);

    return(
        <>
        
        <main>
            {userReviews.length > 0 ? (
            userReviews.map((review) => (
                <Link key={review._id} to={`/myreviews/${review._id}`}>
                    <header>
                        <div>
                            <h2>{review.restaurant}</h2>
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