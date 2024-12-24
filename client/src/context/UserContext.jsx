import React, { useState } from 'react'

const UserDataContext = React.createContext()

const UserContext = ({ children }) => {
    const [user, setUser] = useState({
        email: "",
        fullname: {
            firstname: "",
            lastname: ""
        }
    })
    return (
        <UserDataContext.Provider value={{ user, setUser }}>
            {children}
        </UserDataContext.Provider>
    )
}

export {UserContext, UserDataContext}
