import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext, UserContext } from '../../../providers/AuthProvider'

const Logout = () => {
    const  {auth}  = useContext(AuthContext)
    const  {user}  = useContext(UserContext)

    const sendLogout = async () => {
        console.log('Logout ' + user?.name)
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