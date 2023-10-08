import { createContext, useState } from 'react'
import AuthItem from '../entity/user/Auth'
import UserItem from '../entity/user/User'

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState<AuthItem>({})
    const [user, setUser] = useState<UserItem>({})

    return (
        <AuthContext.Provider value={{ auth, setAuth, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider