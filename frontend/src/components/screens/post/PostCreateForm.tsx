import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../../providers/AuthProvider"
import PostService from '../../../services/PostService'
import MainLayout from "../../layouts/main"
import PostItem from "../../../entity/post/Post.tsx";

const clearForm = {
    title: '',
    content: ''
}

const defaultPost = {'id': null, 'created_at': new Date(), 'title':'','content':''}

const PostCreateForm = () => {
    const [posts, setPosts] = useState<PostItem[]>([defaultPost])

    const [formData, setFormData] = useState(clearForm)
    const nav = useNavigate()

    const getPosts = async () => {
        const postsResponse = await PostService.findAll()
        console.log('postsResponse', postsResponse)
        setPosts(postsResponse.results.sort((a, b) => a.id - b.id))
    }

    const sendPostData = async () => {
        const response = await PostService.create(formData);
        setPosts(prev => [...prev, response])
        openPost(response)
    }

    function createPost(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()
        sendPostData()
        setFormData(clearForm)
    }

    function openPost(post: PostItem) {
        nav(`/posts/${post.id}`)
    }


    useEffect(() => {
        getPosts()
    }, [])

    return (
        <>
            <MainLayout>
                <div className="row">
                    <div className="col-3">
                        <h3>Post Create Form</h3>
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input type="text"
                                    className="form-control"
                                    name="title"
                                    onChange={e => setFormData(prev => ({
                                        ...prev, title: e.target.value
                                    }))}
                                    value={formData.title}
                                />
                                <div className="form-text">Title</div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Content</label>
                                <textarea
                                    className="form-control"
                                    name="content"
                                    rows={4}
                                    onChange={e => setFormData(prev => ({
                                        ...prev, content: e.target.value
                                    }))}
                                    value={formData.content}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={e => createPost(e)}
                            >Create</button>
                        </form>
                    </div>
                </div>
            </MainLayout>
        </>
    )
}

export default PostCreateForm