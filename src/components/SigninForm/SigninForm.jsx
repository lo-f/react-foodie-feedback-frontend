import { useState } from 'react'

const SigninForm = (props) => {
    const [formData, setFormData] = useState({ username: '', password: ''})
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // TODO handle submit

    return (
        <>
            <h1>Sign In</h1>
            <form>
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