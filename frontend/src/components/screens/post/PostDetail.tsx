import React, { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom'
import PostService from '../../../services/PostService.js'
import Post from './Post.js'
import MainLayout from "../../layouts/main.js"

function PostDetail() {
    const [post, setPost] = useState({})
    const { id } = useParams()
    const nav = useNavigate()

    const getPosts = async () => {
        if (!id) return
        const res = await PostService.findById(id)
        if (res?.id)
            setPost(res)
    }

    useEffect(() => {
        getPosts()
    }, [id])

    function back(e: any) {
        nav('/')
        //<Link className="btn btn-primary" to={`/post/${post.id}`}>{`Открыть #${post.id}`}</Link>
    }

    return (
        <MainLayout>
            <div>
                <Post post={post} />
                <button type="button" onClick={e => back(e)} className="btn btn-primary">Back</button>
            </div>
        </MainLayout>
    )
}

export default PostDetail
