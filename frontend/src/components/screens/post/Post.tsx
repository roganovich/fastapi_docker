import { useQuery } from 'react-query'
import PostItem from '../../../entity/post/Post.js'
import PostService from '../../../services/PostService.js'

function Post({ post}) {

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
                </div>
            </div>
        </>
    )
}

export default Post
