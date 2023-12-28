import {useEffect, useState} from "react"
import './Post.module.scss'
import Post from './Post'
import PostService from '../../../services/PostService'
import MainLayout from "../../layouts/main"
import { useNavigate } from "react-router-dom"
import PostItem from "../../../entity/post/Post.tsx";

const defaultPost = {'id': null, 'created_at': new Date(), 'title':'','content':''}

function PostList() {
  const [posts, setPosts] = useState<PostItem[]>([defaultPost])
  const nav = useNavigate()

  const getPosts = async () => {
    const postsResponse = await PostService.findAll()
    console.log('postsResponse', postsResponse)
    setPosts(postsResponse.results.sort((a, b) => a.id - b.id))
  }

  const deletePostData = async (post) => {
    await PostService.deleteById(post.id)
    setPosts(oldValues => {
      return oldValues.filter(function (item) {
        return item !== post
      })
    })
  }

  function deletePost(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, post: PostItem) {
    e.preventDefault()
    console.log('Delete ' + post.id)
    deletePostData(post)
  }

  function openPost(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, post: PostItem) {
    nav(`/posts/${post.id}`)
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <>
      <MainLayout>
        <div className="post_list">
          <h2>Post List</h2>
          <div className="row">
            {
              posts.length ?
                posts.map(post =>
                  <div className="col-3" key={post.id}>
                    <Post post={post} />
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button" onClick={e => openPost(e, post)} className="btn btn-primary">Open</button>
                      <button type="button" onClick={e => deletePost(e, post)} className="btn btn-danger">Delete</button>
                    </div>
                  </div>
                ) : <div>No Posts</div>}
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default PostList
