import React, { useState, useEffect } from "react";

import styles from './Post.module.scss'
import Post from './Post'
import PostCreateForm from '../postCreate/PostCreateForm'
import PostService from '../../../services/PostService'
import { Link, useNavigate } from "react-router-dom";

const fortmatResponse = (res: any) => {
  return res.results.sort((a, b) => a.id - b.id)
};

function PostList() {
  const [posts, setPosts] = useState([])
  const nav = useNavigate()

  const deletePostData = async (post) => {
    
    await PostService.deleteById(post.id)
    setPosts(oldValues => {
      return oldValues.filter(function (item) {
        return item !== post
      })
    })
  }

  const getAllPosts = async () => {
    const res = await PostService.findAll();
    console.log('res', res);
    setPosts(fortmatResponse(res))
  }

  function deletePost(e: any, post: Post) {
    e.preventDefault()
    console.log('Delete ' + post.id)
    deletePostData(post)
  }

  function openPost(e: any, post: Post) {
    nav(`/post/${post.id}`)
  }

  useEffect(() => {
    getAllPosts()
  }, [])

  return (
    <>
      <div className={styles.list}>
        <h2>Post List</h2>
        <div className="row">
          {
            posts.map(post =>
              <div className="col" key={post.id}>
                <Post post={post} posts={posts} setPosts={setPosts} />

                <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button" onClick={e => openPost(e, post)} className="btn btn-primary">Open</button>
                  <button type="button" onClick={e => deletePost(e, post)} className="btn btn-danger">Delete</button>
                </div>
              </div>
            )}
        </div>
        
        <PostCreateForm setPosts={setPosts} />
      </div>
    </>
  )
}

export default PostList
