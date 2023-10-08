import React, { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import UserService from '../../../services/UserService'
import { AuthContext } from '../../../providers/AuthProvider'

const clearForm = {
    username: '',
    password: ''
}

const LoginForm = () => {
    const [formData, setFormData] = useState(clearForm)
    const { auth, setAuth, user, setUser } = useContext(AuthContext)
    const nav = useNavigate()

    const sendLoginData = async () => {
        const authResponse = await UserService.getToken(formData);
        console.log('authResponse', authResponse);
        setAuth(authResponse)
    }

    const getUser = async () => {
        const userResponse = await UserService.getUser(auth);
        console.log('userResponse', userResponse);
        setUser(userResponse)
        nav('/')
    }


    function login(e: any) {
        e.preventDefault()
        sendLoginData()
    }

    useEffect(() => {
        if (auth?.token) {
            getUser()
        }
        if (user?.name) {
            nav('/')
        }
    }, [auth])

    return (<>
        <div className="container-fluid">
            <div className="row">
                <div className="col"></div>
                <div className="col">
                    <h3>Login Form</h3>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Login</label>
                            <input type="text"
                                className="form-control"
                                name="username"
                                onChange={e => setFormData(prev => ({
                                    ...prev, username: e.target.value
                                }))}
                                value={formData?.username}
                            />
                            <div className="form-text">Login</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password"
                                className="form-control"
                                name="password"
                                onChange={e => setFormData(prev => ({
                                    ...prev, password: e.target.value
                                }))}
                                value={formData?.password}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={e => login(e)}
                        >Create</button>
                    </form>
                </div>
                <div className="col"></div>
            </div>
        </div>
    </>)
}

export default LoginForm