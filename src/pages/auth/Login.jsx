import React, { useState } from 'react'
import { useAuth } from '../../context'

export const Login = () => {

    const [formData,setFormData] = useState({
        email: '',
        password: ''
    })

    const { logIn } = useAuth()

    const handleLogin = () => {
        logIn(formData.email, formData.password)
    }

  return (
    <div>
      <input type='email' placeholder='email' onChange={(e) => setFormData(prevState =>({...prevState, email:e.target.value}))}/>
      <input type='password' placeholder='password' onChange={(e) => setFormData(prevState =>({...prevState, password:e.target.value}))}/>
        <button onClick={handleLogin}>Log In</button>
    </div>
  )
}


