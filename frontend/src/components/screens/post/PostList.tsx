import React, { useState, useEffect, useContext } from "react"
import styles from './Post.module.scss'
import Post from './Post'
import PostService from '../../../services/PostService'
import MainLayout from "../../layouts/main"
import { AuthContext } from "../../../providers/AuthProvider"
import { useNavigate } from "react-router-dom"


function PostList() {
  const { posts, setPosts } = useContext(AuthContext)

  const nav = useNavigate()

  const deletePostData = async (post) => {
    await PostService.deleteById(post.id)
    setPosts(oldValues => {
      return oldValues.filter(function (item) {
        return item !== post
      })
    })
  }

  function deletePost(e: any, post: Post) {
    e.preventDefault()
    console.log('Delete ' + post.id)
    deletePostData(post)
  }

  function openPost(e: any, post: Post) {
    nav(`/posts/${post.id}`)
  }

  return (
    <>
      <MainLayout>
        <div className={styles.list}>
          <h2>Post List</h2>
          <div className="row">
            {
              posts.length ?
              posts.map(post =>
                <div className="col" key={post.id}>
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
