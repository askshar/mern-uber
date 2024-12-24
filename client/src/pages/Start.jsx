import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
      <div className='bg-cover bg-bottom bg-[url(https://img.freepik.com/premium-photo/traffic-laws-burning-traffic-light-ai-generative_955712-4557.jpg)] h-screen pt-8 flex justify-between flex-col w-full bg-red-400'>
        <img className='bg-transparent bg-cover w-16 ml-8' src="https://e7.pngegg.com/pngimages/631/1023/png-clipart-logo-brand-product-design-font-uber-logo-text-logo.png" alt="" />
        <div className="bg-white pb-7 py-4 px-4">
          <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
          <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start