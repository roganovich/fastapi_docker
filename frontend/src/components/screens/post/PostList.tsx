import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from 'react-query'

import styles from './Post.module.scss'
import Post from './Post'
import PostService from '../../../data/PostService'
import PostItem from '../../../entity/post/Post'

const fortmatResponse = (res: any) => {
  return res.results;
};

function PostList() {
  const [getPostResult, setPostResult] = useState([]);


  const { isLoading: isLoadingTutorials, refetch: getAllPosts } = useQuery<PostItem[], Error>(
    "query-tutorials",
    async () => {
      return await PostService.findAll();
    },
    {
      enabled: false,
      onSuccess: (res) => {
        setPostResult(fortmatResponse(res));
      },
      onError: (err: any) => {
        setPostResult(err.response?.data || err);
      },
    }
  );

  function getAllData() {
    try {
      getAllPosts();
      console.log('getPostResult', getPostResult);
    } catch (err) {
      setPostResult(err);
    }
  }

  return (
    <>
      <div>
        <h2>Post List</h2>
        <button className="btn btn-sm btn-primary" onClick={getAllData}>
          Posts
        </button>
        <div className={styles.list}>
          {
            getPostResult.map(post =>
              <Post key={post.id} post={post} />
              )}
        </div>
      </div>
    </>
  )
}

export default PostList
