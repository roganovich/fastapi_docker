import React, { useState, useEffect } from "react"
import { useQuery } from 'react-query'
import PostService from '../../../data/PostService'
import PostItem from '../../../entity/post/Post'

const PostCreateForm = ({ setPosts }) => {
    const [getTitle, setTitle] = useState('')
    const [getContent, setContent] = useState('')


    const { isLoading: isLoadingTutorials, refetch: sendPostData } = useQuery<PostItem, Error>(
        "query-tutorials",
        async () => {
            return await PostService.create(getTitle, getContent);
        },
        {
            enabled: false,
            onSuccess: (res) => {
                const post = res
                console.log('Post', post)
                setPosts(prev => [...prev, post])
            },
            onError: (err: any) => {
                //setPosts(err.response?.data || err);
            },
        }
    );

    function createPost(e: any) {
        e.preventDefault()
        sendPostData()
    }

    return (<>
        <div className="row">
            <div className="col-3">
                <h3>Post Create Form</h3>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input type="text"
                            className="form-control"
                            name="title"
                            onChange={e => setTitle(e.target.value)}
                            value={getTitle}
                        />
                        <div className="form-text">Title</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Content</label>
                        <textarea
                            className="form-control"
                            name="content"
                            rows={4}
                            onChange={e => setContent(e.target.value)}
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
    </>)
}

export default PostCreateForm