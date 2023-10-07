import { useQuery } from 'react-query'
import PostItem from '../../../entity/post/Post.js'
import PostService from '../../../data/PostService'

function Post({ post, setPosts }) {

    const deletePostData = async () => {
        await PostService.deleteById(post.id);
        setPosts(oldValues => {
            return oldValues.filter(function (item) {
                return item !== post
            })
          })
    }

    function deletePost(e: any) {
        e.preventDefault()
        console.log('Delete ' + post.id)
        deletePostData()
    }

    return (
        <>
            <div className="card" style={
                {
                    width: '18rem'
                }
            }>
                <img src="/images/webp-800x800.webp" className="card-img-top" alt="{post.title}" />
                <div className="card-body">
                    <h5 className="card-title">#{post.id} {post.title}</h5>
                    <p className="card-text">{post.content}</p>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" onClick={e => openPost(e)} className="btn btn-primary">Open</button>
                        <button type="button" onClick={e => copyPost(e)} className="btn btn-success">Copy</button>
                        <button type="button" onClick={e => deletePost(e)} className="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Post
