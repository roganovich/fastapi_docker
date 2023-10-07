import React, { useState, useEffect } from "react";

import styles from './Post.module.scss'
import Post from './Post'
import PostCreateForm from '../postCreate/PostCreateForm'
import PostService from '../../../data/PostService'
import PostItem from '../../../entity/post/Post'

const fortmatResponse = (res: any) => {
  return res.results;
};

function PostList() {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    const res = await PostService.findAll();
    setPosts(fortmatResponse(res));
  }

  useEffect(() => {
    getAllPosts()
  }, [])

  return (
    <>
      <div className={styles.list}>
        <PostCreateForm setPosts={setPosts} />
        <h2>Post List</h2>
        <div className="row">
          {
            posts.map(post =>
              <div className="col" key={post.id}>
                <Post post={post} setPosts={setPosts} />
              </div>
            )}
        </div>
      </div>
    </>
  )
}

export default PostList
