import axios from "axios"
import PostItem from "../entity/post/Post.js"

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8081/",
  headers: {
    "Content-type": "application/json",
  },
})

const findAll = async () => {
  const response = await apiClient.get("/posts")
  return response.data
}

const findById = async (id: any) => {
  const response = await apiClient.get<PostItem>(`/posts/${id}`)
  return response.data
}

const deleteById = async (id: any) => {
  const storedDate = JSON.parse(sessionStorage.getItem('auth'))
  const headers = {
    'Authorization': 'Bearer ' + storedDate.token
  }
  const response = await apiClient.delete<PostItem>(`/posts/${id}`, { headers })
  return response.data
}

const create = async (formData: any) => {
  const storedDate = JSON.parse(sessionStorage.getItem('auth'))
  const headers = {
    'Authorization': 'Bearer ' + storedDate.token
  }
  const response = await apiClient.post(`/posts/`, formData, { headers })
  return response.data
}

const PostService = {
  findAll,
  findById,
  deleteById,
  create
}

export default PostService