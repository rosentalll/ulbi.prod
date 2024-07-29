import "./App.css";
import React, { useState, useMemo } from "react";
import Posts from "./components/Posts";
import Form from "./components/Form";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import MyButton from "./components/UI/button/MyButton";

export default function App() {

  const [posts, setPosts] = useState( [] )
  const [filter, setFilter] = useState( {sort: "", query: ""} )
  const [visible, setVisible] = useState(false)

  const sortedPosts = useMemo(
    () => {
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
      console.log('сработал')
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
    setVisible(false)
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
      <MyButton 
        style={{margin: "top"}}
        onClick={
          () => setVisible(true)
        } 
      >
        Создать пользователя
      </MyButton>
      <MyModal 
        visible={visible}
        setVisible={setVisible}
      >
        <Form createPost={createPost} />
      </MyModal>
      <h1 className="title">Список постов</h1>
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
