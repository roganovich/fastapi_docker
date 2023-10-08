import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Home from '../components/screens/home/Home'
import PostDetail from '../components/screens/post/PostDetail'
import LoginForm from './screens/user/LoginFrom'
import Logout from "./screens/user/Logout"

const Router = () => {
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