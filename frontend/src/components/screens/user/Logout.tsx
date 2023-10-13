import React, { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../../../providers/AuthProvider'

const Logout = () => {
    const { auth, setAuth, user, setUser } = useContext(AuthContext)

    const sendLogout = async () => {
        console.log('Logout ' + user?.name)
        setUser(null)
        setAuth(null)
        sessionStorage.removeItem('auth')
    }

    const nav = useNavigate()

    useEffect(() => {
        if (auth?.token) {
            sendLogout()
            nav('/')
        } else {
            nav('/login')
        }
    }, [])

    return (
        <>Exit</>
    )
}

export default Logout