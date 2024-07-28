import "./App.css";
import React, { useState } from "react";
import Posts from "./components/Posts";
import Form from "./components/Form";
import MySelect from "./components/UI/select/MySelect"
import MyInput from "./components/UI/input/MyInput";

export default function App() {

  const [posts, setPosts] = useState([])
  const [criteria, setCriteria] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

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

  function sortPosts(value) {
    setCriteria(value)
    setPosts(
      [...posts].sort(
        (a, b) => 
          a[value].localeCompare(b[value])
      )
    )
  }

  return (
    <div className="App">
      <h1 className="title">Список постов</h1>
      <Form createPost={createPost} />
      <hr className="line" />
      <div>
        <MyInput 
          placeholder="Поиск..." 
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <MySelect 
          value={criteria}
          sortPosts={sortPosts}
          defaultValue="Сортировка"
          options={[
            {value: "title", label: "По заголовку"},
            {value: "content", label: "По содержанию"}
          ]}
        />
      </div>
      {
        !posts.length ? 
          <h2 className="title-2">Посты не найдены!</h2> :
          <Posts 
            posts={posts} 
            removePost={removePost}
          />
      }
    </div>
  );
}
