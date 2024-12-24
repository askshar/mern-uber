import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainLogout = () => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.status == 200) {
                localStorage.removeItem("token")
                navigate("/captain-login")
            }
        })
    }, [])
  return (
    <div>CaptainLogout</div>
  )
}

export default CaptainLogout