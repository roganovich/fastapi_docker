import { useState } from 'react'
import styles from './Home.module.scss'
import PostList from '../post/PostList'

function App() {
  return (
    <>
      <div className={styles.header}>
        <h1>Frontend</h1>
        <PostList />
      </div>
    </>
  )
}

export default App
