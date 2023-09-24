import styles from './Post.module.scss'
import PostItem from '../../../entity/post/Post.js'

function Post({ post }) {
    return (
        <>
            <div className={styles.post}
                style={
                    {
                        backgroundImage: 'url(/images/webp-800x800.webp)'
                    }
                }>
                {/*<div className={styles.image}><img src='/images/webp-800x800.webp' alt=''/></div>*/}
                <div className={styles.title}>{post.title}</div>
                <div className={styles.description}>{post.content}</div>
                <div className={styles.btn}><button>Open #{post.id}</button></div>
            </div>
        </>
    )
}

export default Post
