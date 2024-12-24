import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCaptain } from '../context/CaptainContext'
import axios from 'axios'

const captainSignup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [userData, setUserData] = useState({})
  const [vehicleColor, setVehicleColor] = useState("")
  const [vehiclePlate, setVehiclePlate] = useState("")
  const [vehicleCapacity, setVehicleCapacity] = useState("")
  const [vehicleType, setVehicleType] = useState("")

  const { captain, setCaptain } = useCaptain()
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    const captainData = {
      email,
      password,
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)
    if (response.status == 201){
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem("token", data.token)
      navigate("/captain-home")
    }
    setEmail("")
    setPassword("")
    setFirstName("")
    setLastName("")
    setVehicleCapacity("")
    setVehicleColor("")
    setVehiclePlate("")
    setVehicleType("")
  }
  return (
    <div className='px-5 py-5 h-screen flex flex-col justify-between'>
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

          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="bike">Bike</option>
            </select>
          </div>

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-base placeholder:text-sm'
          >Register</button>
        </form>
        <p className='text-center'>Already have an account? <Link to='/captain-login' className='text-blue-600'>Login</Link></p>
      </div>

      <div>
        <p className='text-[10px]'>By signing up, you agree to our <span className='text-blue-600'>Terms</span> and <span className='text-blue-600'>Privacy Policy</span></p>
      </div>
    </div>
  )
}

export default captainSignup