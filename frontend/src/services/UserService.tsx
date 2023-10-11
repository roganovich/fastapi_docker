import axios from "axios"
import User from '../entity/user/User'
import AuthItem from '../entity/user/Auth'

const apiClient = axios.create({
    baseURL: "http://127.0.0.1:8081/",
    headers: {
        "Content-type": "application/json",
    },
})


const getToken = async (formData: any) => {
    const headers = {
        'Content-Type': 'multipart/form-data'
    }
    const response = await apiClient.post(`/auth`, formData, { headers })
    return response.data
}

const getUser = async (auth: AuthItem) => {
    if (typeof auth?.token === 'undefined') {
        return
    }
    const headers = {
        'Authorization': 'Bearer ' + auth.token
    }
    console.log('Authorization', headers);
    const response = await apiClient.get(`/users/me`, { headers })
    return response.data
}

const UserService = {
    getToken,
    getUser
}


export default UserService