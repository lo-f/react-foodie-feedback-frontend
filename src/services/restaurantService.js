const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/restaurants`;

const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        return res.json();
    } catch (error) {}
}

const show = async (restaurantId) => {
    try {
        const res = await fetch(`${BASE_URL}/${restaurantId}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        });
        return res.json();
    } catch (error) {}
};

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
    } catch (error) {}
};

const deleteRestaurant = async (restaurantId) => {
    try {
        const res = await fetch(`${BASE_URL}/${restaurantId}`, {
            method: 'DELETE',
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        });
        return res.json();
    } catch(error) {}
}

const editRestaurant = async (restaurantId, restaurantFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${restaurantId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(restaurantFormData)
        });
        return res.json()
    } catch (error) {}
}

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
    } catch (error) {}
}


const deleteReview = async (restaurantId, reviewId) => {
    try {
        const res = await fetch(`${BASE_URL}/${restaurantId}/reviews/${reviewId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        return res.json()
    } catch (error) {}
}

const editReview = async (restaurantId, reviewId, reviewFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${restaurantId}/reviews/${reviewId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewFormData)
        });
        return res.json()
    } catch (error) {}
}

export default { 
    index,
    show, 
    createRestaurant, 
    createReview, 
    deleteRestaurant, 
    editRestaurant,
    deleteReview,
    editReview
}




