import "./App.css";

import React, { useState, useEffect } from "react";
import { usePosts } from "./hooks/usePosts";

import Posts from "./components/Posts";
import Form from "./components/Form";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import Loader from "./components/UI/loader/Loader";

import PostService from "./API/PostService";

export default function App() {

  const [posts, setPosts] = useState( [] )
  const [filter, setFilter] = useState( {sort: "", query: ""} )
  const [modal, setModal] = useState(false)
  const [isPostsLoading, setIsPostsLoading] = useState(false)

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

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
    setModal(false)
  }

  function removePost(id) {
    setPosts(
      posts.filter(
        post => 
          post.id !== id
      )
    )
  }

  async function fetchPosts() {
    setIsPostsLoading(true)
    setTimeout( async () => {
      const response = await PostService.getAll()
      setPosts(response)
      setIsPostsLoading(false)
    }, 2000)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="App">
      <h1 className="title">
        Список постов
      </h1>
      <MyButton 
        onClick={
          () => setModal(true)
        }>
        Создать свой пост
      </MyButton>
      <MyButton onClick={fetchPosts}>
        Посты с сервера
      </MyButton>
      <MyModal 
        modal={modal} 
        setModal={setModal}
      >
        <Form createPost={createPost} />
      </MyModal>
      <PostFilter 
        filter={filter}
        setFilter={setFilter}
      />
      {
        isPostsLoading ?
          <div style={
            {
              display: "flex", 
              marginTop: "50px", 
              justifyContent: "center"
            }
          }>
            <Loader />
          </div>
            :
          <Posts 
            posts={sortedAndSearchedPosts} 
            removePost={removePost}
          />
      }
    </div>
  );
}
