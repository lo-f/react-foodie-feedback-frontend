import { useState } from 'react'

const RestaurantForm = ({ user }) => {
    const [formData, setFormData] = useState({
        name: '',
        hours: '',
        image: '',
        category: ''
    })

    return (
        <>
            <h1>Create a New Restaurant</h1>
            <form>
                <label htmlFor='restaurantName'>Restaurant Name: </label>
                <input type="text"/>
            </form>
        </>
    )
}

export default RestaurantForm