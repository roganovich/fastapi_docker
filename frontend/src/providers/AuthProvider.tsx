import { createContext, useState } from 'react'
import AuthItem from '../entity/user/Auth'
import UserItem from '../entity/user/User'
import PostItem from '../entity/post/Post';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState<AuthItem>({})
    const [user, setUser] = useState<UserItem>({})
    const [posts, setPosts] = useState<PostItem>({})
    
    return (
        <AuthContext.Provider value={{ auth, setAuth, user, setUser, posts, setPosts }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider