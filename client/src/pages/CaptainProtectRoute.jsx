import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCaptain } from '../context/CaptainContext'
import axios from 'axios'

const CaptainProtectRoute = ({ children }) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const {setCaptain} = useCaptain()

    useEffect(() => {
        if (!token) {
            navigate('/captain-login')
        }
    }, [token, navigate])

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res) => {
        if (res.status == 200) {
            setCaptain(res.data.captain)
            setIsLoading(false)
        }
    }).catch((err) => {
        console.log(err)
        localStorage.removeItem("token")
        navigate("/captain-login")
    })

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectRoute