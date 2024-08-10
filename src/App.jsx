import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SigninForm from './components/SigninForm/SigninForm'
import SignupForm from './components/SignupForm/SignupForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SigninForm />
      <SignupForm />
    </>
  )
}

export default App
