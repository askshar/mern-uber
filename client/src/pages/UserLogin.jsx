import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'

const UserLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userData, setUserData] = useState({})
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserDataContext)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      navigate("/home")
    }
  }, [])

  const submitHandler = async (e) => {
    e.preventDefault()
    const loginData = {
      email,
      password
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, loginData)
    if (response.status === 200) {
      const data = response.data
      localStorage.setItem('token', data.token)
      navigate('/home')
    }
    setEmail("")
    setPassword("")
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src="https://e7.pngegg.com/pngimages/631/1023/png-clipart-logo-brand-product-design-font-uber-logo-text-logo.png" alt="" />
        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
          <input
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder='example@email.com'
          />
          <h3 className='text-lg font-medium mb-2'>Enter your password</h3>
          <input
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder='password'
          />
          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'
          >Login</button>
        </form>
        <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create Account</Link></p>
      </div>

      <div>
        <Link
          to='/captain-login'
          className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin