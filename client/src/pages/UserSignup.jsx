import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {UserDataContext} from '../context/UserContext'
import axios from 'axios'

const UserSignup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [userData, setUserData] = useState({})
  const {user, setUser} = useContext(UserDataContext)

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    const newUser = {
      email, password,
      fullname: {
        firstname: firstName,
        lastname: lastName
      }
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
    if (response.status === 201) {
      const data = response.data
      localStorage.setItem('token', data.token)
      navigate('/home')
    }
    setEmail("")
    setPassword("")
    setFirstName("")
    setLastName("")
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src="https://e7.pngegg.com/pngimages/631/1023/png-clipart-logo-brand-product-design-font-uber-logo-text-logo.png" alt="" />
        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className='text-lg font-medium mb-2'>What's your name?</h3>
          <div className='flex gap-5 mb-5'>
            <input
              className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              type="text"
              placeholder='First Name'
            />
            <input
              className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder='Last Name'
            />
          </div>
          <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
          <input
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder='example@email.com'
          />
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder='password'
          />
          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-base placeholder:text-sm'
          >Register</button>
        </form>
        <p className='text-center'>Already have an account? <Link to='/login' className='text-blue-600'>Login</Link></p>
      </div>

      <div>
        <p className='text-[10px]'>By signing up, you agree to our <span className='text-blue-600'>Terms</span> and <span className='text-blue-600'>Privacy Policy</span></p>
      </div>
    </div>
  )
}

export default UserSignup