import { useState } from 'react'
import restaurantService from '../../services/restaurantService'
import { useNavigate } from 'react-router-dom'

const RestaurantForm = ({ user }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        hours: '',
        image: '',
        category: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        restaurantService.createRestaurant(formData);
        navigate('/restaurants')
    }

    return (
        <>
            <h1>Create a New Restaurant</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='restaurantName'>Restaurant Name: </label>
                <input 
                    type="text"
                    id='restaurantName'
                    name='name'
                    className='restaurantFormField'
                    value={formData.restaurantName}
                    onChange={handleChange}
                    required
                     />
                <label htmlFor='description'>Restaurant Name: </label>
                <textarea 
                    id='description'
                    name='description'
                    className='restaurantFormField'
                    value={formData.description}
                    onChange={handleChange}
                    required
                     />
                <label htmlFor='hours'>Hours: </label>
                <input 
                    type='text'
                    id='hours'
                    name='hours'
                    className='restaurantFormField'
                    value={formData.hours} 
                    onChange={handleChange}
                    required />
                <label htmlFor='image'>Image URL: </label>
                <input 
                    type='text'
                    id='image'
                    name='image'
                    className='restaurantFormField'
                    value={formData.image}
                    onChange={handleChange} />
                <label htmlFor='category'>Select Category</label>
                <select
                    name='category'
                    id='category' 
                    className='restaurantFormField'
                    value={formData.category}
                    onChange={handleChange}
                    required>
                        <option value="Chinese">Chinese</option>
                        <option value="Italian">Italian</option>
                        <option value="Fast Food">Fast Food</option>
                        <option value="Mexican">Mexican</option>
                        <option value="BBQ">BBQ</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default RestaurantForm