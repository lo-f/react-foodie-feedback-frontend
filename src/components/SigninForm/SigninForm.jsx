import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../../services/authservice'
import './SigninForm.css'

const SigninForm = (props) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: ''});
    const [message, setMessage] = useState(['']);
    
    const updateMessage = (message) => {
        setMessage(message)
    }
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await authService.signin(formData);
            props.setUser(user);
            navigate('/')
        } catch (error) {
            updateMessage(error.message)
        }
    }


    return (
        <div className='mainContainer'>
            <h1>Sign In</h1>
            <p>{message}</p>
            <form autoComplete='off' onSubmit={handleSubmit}>
                <div className='groupContainer'>
                    <div className='labelInputGroup'>
                    <label htmlFor='signinUsername'>Username: </label>
                    <input 
                        type="text" 
                        id="signinUsername"
                        name="username"
                        className="signFormInput"
                        value={formData.username}
                        onChange={handleChange}/>
                    </div>
                    <div className='labelInputGroup'>
                    <label htmlFor='signinPassword'>Password: </label>
                    <input 
                        type="password" 
                        id="signinPassword"
                        className="signFormInput" 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}/>
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SigninForm