import {createContext, useState} from 'react'
import AuthItem from '../entity/user/Auth'
import UserItem from '../entity/user/User'


const defaultAuth = {'token': '', 'expires': new Date()}
const defaultUser = {'id': '', 'email': '', 'name': ''}

type AuthContextType = {
    auth: AuthItem;
    setAuth: (auth: AuthItem) => void;
};

type UserContextType = {
    user: UserItem;
    setUser: (user: UserItem) => void;
};

export const AuthContext = createContext<AuthContextType>({
    auth: defaultAuth,
    setAuth: () => {},
});
export const UserContext = createContext<UserContextType>({
    user: defaultUser,
    setUser: () => {},
});

type Props = {
    children: React.ReactNode;
}

const AuthProvider = ({children}: Props) => {
    const [auth, setAuth] = useState<AuthItem>(defaultAuth)
    const [user, setUser] = useState<UserItem>(defaultUser)

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            <UserContext.Provider value={{user, setUser}}>
                {children}
            </UserContext.Provider>
        </AuthContext.Provider>
    )
}

export default AuthProvider