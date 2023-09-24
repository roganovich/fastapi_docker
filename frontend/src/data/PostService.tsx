import axios from "axios";
import PostItem from "../entity/post/Post.jsx";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8081/",
  headers: {
    "Content-type": "application/json",
  },
});

const findAll = async () => {
  const response = await apiClient.get("/posts");
  return response.data;
}

const findById = async (id: any) => {
  const response = await apiClient.get<PostItem>(`/posts/${id}`);
  return response.data;
}

const PostService = {
  findAll,
  findById
}

export default PostService;