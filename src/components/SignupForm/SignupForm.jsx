import { useState } from 'react'
import authService from '../../services/authservice'
import { Link, useNavigate } from 'react-router-dom'

const SignupForm = (props) => {
    const navigate = useNavigate()
    const [message, setMessage] = useState([''])
    const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: ''})
    
    const updateMessage = (msg) => {
        setMessage(msg)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const user = await authService.signup(formData)
            props.setUser(user)
            navigate('/')
        } catch (error) {
            updateMessage(error.message)
        }
    }

    const { username, password, confirmPassword } = formData;

    const isFormInvalid = () => {
        return !(username && password && password === confirmPassword)
    }

    return (
        <>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='signupUsername'>Username: </label>
                <input 
                    type="text" 
                    id="signupUsername"
                    name="username"
                    className="signFormInput"
                    value={formData.username}
                    onChange={handleChange}/>
                <label htmlFor='signupPassword'>Password: </label>
                <input 
                    type="password" 
                    id="signupPassword"
                    className="signFormInput" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}/>
                <label htmlFor='confirmPassword'>Confirm Password: </label>
                <input 
                    type="password"
                    id="confirmPassword"
                    className="signFormInput"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    />
                <button disabled={isFormInvalid()} type="submit">Submit</button>
            </form>
        </>
    )
}

export default SignupForm