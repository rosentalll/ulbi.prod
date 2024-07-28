import "./App.css";
import React, { useState } from "react";
import Posts from "./components/Posts";
import Form from "./components/Form";
import MySelect from "./components/UI/select/MySelect"

export default function App() {

  const [posts, setPosts] = useState([])

  const [sortingCriteria, setSortingCriteria] = useState('')

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
        post => post.id !== id
      )
    )
  }

  function sortPosts(criteria) {
    setSortingCriteria(criteria)
    console.log(sortingCriteria)
    // setPosts(
    //   [...posts].sort(
    //     (a, b) => 
    //       a[sort].localeCompare(b[sort])
    //   )
    // )
  }

  return (
    <div className="App">
      <h1 className="title">Список постов</h1>
      <Form createPost={createPost} />
      <hr className="line" />
      <div>
        <MySelect
          value={sortingCriteria}
          handleChange={sortPosts}
          defaultValue="Сортировка"
          options={[
            {value: "title", name: "По названию"},
            {value: "content", name: "По описанию"}
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
