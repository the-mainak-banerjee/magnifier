import React, { useState } from 'react'
import { useAuth } from '../../context'

export const Signup = () => {

    const [formData,setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    })

    const { signUp } = useAuth()

    const handleSignup = () => {
        signUp(formData.fullName, formData.email, formData.password)
    }

  return (
    <div>
      <input type='text' placeholder='fullname' onChange={(e) => setFormData(prevState =>({...prevState, fullName:e.target.value}))}/>
      <input type='email' placeholder='email' onChange={(e) => setFormData(prevState =>({...prevState, email:e.target.value}))}/>
      <input type='password' placeholder='password' onChange={(e) => setFormData(prevState =>({...prevState, password:e.target.value}))}/>
        <button onClick={handleSignup}>Sign Up</button>
    </div>
  )
}


