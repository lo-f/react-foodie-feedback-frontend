import { Link } from "react-router-dom";
import styles from './RestaurantsList.module.css'
 
const RestaurantsList = (props) => {
    return(
        <>
        <main className={styles.container}>
            <header>
                <h1>Restaurants</h1>
                <div>
                    <Link to={'/restaurants/new'}>Add Restaurant</Link>
                </div>
            </header>
            <section>
            {props.restaurants.map((restaurant) => {
                return <Link id={styles.restaurantLink} key={restaurant._id} to={`/restaurants/${restaurant._id}`}>
                        <div className={styles.restaurantCard}>
                            <img src={restaurant.image ? restaurant.image : "../../public/images/default-restaurant-image.png"} alt="" />
                            <div className={styles.restaurantInfo}>
                                <h2>{restaurant.name}</h2>
                                <h3>{restaurant.category}</h3>
                            </div>
                        </div>
                </Link>
            })}
            </section>
        </main>
        </>
    )
}

export default RestaurantsList;