const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/restaurants`;

const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        return res.json();
    } catch (error) {
        console.log(error)
    }
}

const createRestaurant = async (restaurantFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(restaurantFormData)
        });
        return res.json();
    } catch (error) {
        console.log(error)
    }
};

const createReview = async (restaurantId, reviewFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${restaurantId}/reviews`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewFormData)
        });
        return res.json();
    } catch (error) {
        console.log(error)
    }
}

export default { index, createRestaurant, createReview }
