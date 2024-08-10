import { useState } from 'react'

const SignupForm = (props) => {
    const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: ''})
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // TODO handle submit

    return (
        <>
            <h1>Sign Up</h1>
            <form>
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
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input 
                    type="password"
                    id="confirmPassword"
                    className="signFormInput"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default SignupForm