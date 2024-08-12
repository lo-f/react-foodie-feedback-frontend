import { useState } from 'react'

const RestaurantForm = ({ user }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        hours: '',
        image: '',
        category: ''
    })

    return (
        <>
            <h1>Create a New Restaurant</h1>
            <form>
                <label htmlFor='restaurantName'>Restaurant Name: </label>
                <input 
                    type="text"
                    id='restaurantName'
                    name='restaurantName'
                    className='restaurantFormField'
                    value={formData.name}
                    required
                     />
                <label htmlFor='description'>Restaurant Name: </label>
                <textarea 
                    id='description'
                    name='description'
                    className='restaurantFormField'
                    value={formData.description}
                    required
                     />
                <label htmlFor='hours'>Hours: </label>
                <input 
                    type='text'
                    id='hours'
                    name='hours'
                    className='restaurantFormField'
                    value={formData.hours} 
                    required />
                <label htmlFor='image'>Image URL: </label>
                <input 
                    type='text'
                    id='image'
                    name='image'
                    className='restaurantFormField'
                    value={formData.image} />
                <label htmlFor='category'>Select Category</label>
                <select
                    name='category'
                    id='category' 
                    className='restaurantFormField'
                    value={formData.category}
                    required>
                        <option value="Chinese">Chinese</option>
                        <option value="Italian">Italian</option>
                        <option value="Fast Food">Fast Food</option>
                        <option value="Mexican">Mexican</option>
                        <option value="BBQ">BBQ</option>
                </select>
            </form>
        </>
    )
}

export default RestaurantForm