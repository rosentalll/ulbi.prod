import "./App.css";
import React, { useState, useMemo } from "react";
import Posts from "./components/Posts";
import Form from "./components/Form";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import { usePosts } from "./components/hooks/usePosts";

export default function App() {

  const [posts, setPosts] = useState( [] )
  const [filter, setFilter] = useState( {sort: "", query: ""} )
  const [modal, setModal] = useState(false)

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

  return (
    <div className="App">
      <h1 className="title">Список постов</h1>
      <MyButton onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal modal={modal} setModal={setModal}>
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
