import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import React, { useContext, useEffect } from "react"


import Home from '../components/screens/home/Home'
import PostDetail from '../components/screens/post/PostDetail'
import LoginForm from './screens/user/LoginFrom'
import Logout from "./screens/user/Logout"
import { AuthContext } from '../providers/AuthProvider'
import UserService from '../services/UserService'

const Router = () => {
    const { auth, setAuth, user, setUser } = useContext(AuthContext)

    const getUser = async () => {
        const userResponse = await UserService.getUser(auth);
        console.log('userResponse', userResponse);
        setUser(userResponse)
    }

    useEffect(() => {
        const stored = sessionStorage.getItem('auth');
        if (stored){
            const storedDate = JSON.parse(stored)
            setAuth(storedDate.token)
            getUser()
        }
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<LoginForm />}></Route>
                <Route path="/logout" element={<Logout />}></Route>
                <Route path="/post/:id" element={<PostDetail />}></Route>
                <Route path="*" element={<div>404 Post Not Found</div>}></Route>
            </Routes>
        </BrowserRouter>
    )
};

export default Router