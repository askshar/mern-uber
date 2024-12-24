import React, { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserProtectRoute = ({ children }) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const { setUser } = useContext(UserDataContext)

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [token, navigate])

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res) => {
        if (res.status == 200) {
            setUser(res.data.user)
            setIsLoading(false)
        }
    }).catch((err) => {
        console.log(err)
        localStorage.removeItem("token")
        navigate("/login")
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

export default UserProtectRoute