import "./App.css";
import React, { useState, useMemo } from "react";
import Posts from "./components/Posts";
import Form from "./components/Form";
import PostFilter from "./components/PostFilter";

export default function App() {

  const [posts, setPosts] = useState( [] )
  const [filter, setFilter] = useState( {sort: "", query: ""} )

  const sortedPosts = useMemo(
    () => {
      console.log('worked')
      if (filter.sort) {
        return (
          [...posts].sort(
            (a, b) => 
              a[filter.sort].localeCompare(b[filter.sort]))
        )
      } else {
        return posts
      }
    }, [filter.sort,  posts]
  )

  const sortedAndSearchedPosts = useMemo(
    () => {
      return sortedPosts.filter(
        post => 
          post.title
            .toLowerCase()
            .includes(filter.query)
      )
    }, [filter.query, sortedPosts]
  )

  function createPost(post) {
    setPosts(
      [
        ...posts,
        {
          id: Date.now(),
          ...post
        }
      ]
    )
  }

  function removePost(id) {
    setPosts(
      posts.filter(
        post => 
          post.id !== id
      )
    )
  }

  return (
    <div className="App">
      <h1 className="title">Список постов</h1>
      <Form createPost={createPost} />
      <hr className="line" />
      <PostFilter 
        filter={filter}
        setFilter={setFilter}
      />
      <Posts 
        posts={sortedAndSearchedPosts} 
        removePost={removePost}
      />
    </div>
  );
}
