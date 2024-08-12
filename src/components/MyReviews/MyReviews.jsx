import { Link } from "react-router-dom";
 
const MyReviews = (props) => {
    const { reviews, user } = props;
    const userReviews = reviews.filter(review => review.author === user)
    return(
        <>
        
        <main>
            {userReviews.length > 0 ? (
            userReviews.map((review) => (
                <Link key={review._id} to={`/myreviews/${review._id}`}>
                    <header>
                        <div>
                            <h2>{restaurant.name}</h2>
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