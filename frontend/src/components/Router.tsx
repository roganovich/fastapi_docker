import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import { useContext, useEffect } from "react"

import Home from '../components/screens/home/Home'
import LoginForm from './screens/user/LoginFrom'
import Logout from "./screens/user/Logout"
import { AuthContext } from '../providers/AuthProvider'
import UserService from '../services/UserService'
import PostCreateForm from "./screens/post/PostCreateForm"
import PostList from "./screens/post/PostList"
import PostDetail from '../components/screens/post/PostDetail'
import PostService from "../services/PostService";

const Router = () => {
    const { auth, setAuth, setUser, setPosts } = useContext(AuthContext)


    function getAuth() {
        const stored = sessionStorage.getItem('auth')
        console.log('sessionStorage', stored);
        if (stored) {
            const storedDate = JSON.parse(stored)
            setAuth(storedDate)
        }
    }

    const getUser = async () => {
        const userResponse = await UserService.getUser(auth)
        console.log('userResponse', userResponse)
        setUser(userResponse)
    }

    const getPosts = async () => {
        const postsResponse = await PostService.findAll()
        console.log('postsResponse', postsResponse)
        setPosts(postsResponse.results.sort((a, b) => a.id - b.id))
    }

    useEffect(() => {
        if (auth?.token){
            getUser()
            getPosts()
        }
    }, [auth])

    useEffect(() => {
        getAuth()
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<LoginForm />}></Route>
                <Route path="/logout" element={<Logout />}></Route>
                <Route path="/posts/" element={<PostList />}></Route>
                <Route path="/posts/:id" element={<PostDetail />}></Route>
                <Route path="/posts/new" element={<PostCreateForm setPosts={setPosts} />}></Route>
                <Route path="*" element={<div>404 Post Not Found</div>}></Route>
            </Routes>
        </BrowserRouter>
    )
};

export default Router