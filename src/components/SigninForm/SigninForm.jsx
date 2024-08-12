import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../../services/authservice'

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
        <>
            <h1>Sign In</h1>
            <p>{message}</p>
            <form autoComplete='off' onSubmit={handleSubmit}>
                <label htmlFor='signinUsername'>Username: </label>
                <input 
                    type="text" 
                    id="signinUsername"
                    name="username"
                    className="signFormInput"
                    value={formData.username}
                    onChange={handleChange}/>
                <label htmlFor='signinPassword'>Password: </label>
                <input 
                    type="password" 
                    id="signinPassword"
                    className="signFormInput" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}/>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default SigninForm