import { useState } from "react"
import PostService from '../../../services/PostService'
import MainLayout from "../../layouts/main"
import { useNavigate } from "react-router-dom"

const clearForm = {
    title: '',
    content: ''
}

const PostCreateForm = ({ setPosts }) => {
    const [formData, setFormData] = useState(clearForm)
    const nav = useNavigate()

    const sendPostData = async () => {
        const response = await PostService.create(formData);
        setPosts(prev => [...prev, response])
        openPost(response)
    }

    function createPost(e: any) {
        e.preventDefault()
        sendPostData()
        setFormData(clearForm)
    }
    function openPost(post: Post) {
        nav(`/posts/${post.id}`)
    }

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