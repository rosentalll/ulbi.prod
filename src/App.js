import "./App.css";

import React, { useState, useEffect } from "react";
import { usePosts } from "./hooks/usePosts";

import Posts from "./components/Posts";
import Form from "./components/Form";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import MyButton from "./components/UI/button/MyButton";

import PostService from "./API/PostService";


export default function App() {

  const [posts, setPosts] = useState( [] )
  const [filter, setFilter] = useState( {sort: "", query: ""} )
  const [modal, setModal] = useState(false)

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  useEffect(() => {
    fetchPosts()
  }, [])

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
    const response = await PostService.getAll()
    setPosts(response)
  }

  return (
    <div className="App">
      <h1 className="title">Список постов</h1>
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
      <Posts 
        posts={sortedAndSearchedPosts} 
        removePost={removePost}
      />
    </div>
  );
}
