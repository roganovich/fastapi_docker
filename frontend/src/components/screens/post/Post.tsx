import styles from './Post.module.scss'
import PostItem from '../../../entity/post/Post.js'

function Post({ post }) {
    return (
        <>
            <div className="card" style={
                {
                    width: '18rem'
                }
            }>
                <img src="/images/webp-800x800.webp" className="card-img-top" alt="{post.title}" />
                    <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <p className="card-text">{post.content}</p>
                        <a href="#" className="btn btn-primary">Open #{post.id}</a>
                    </div>
            </div>
        </>
    )
}

export default Post
