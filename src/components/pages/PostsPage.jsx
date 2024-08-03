import React, { useState, useEffect } from "react";
import { usePosts } from "../../hooks/usePosts"

import Posts from "../Posts" 
import Form from "../Form" 
import PostFilter from "../PostFilter" 
import MyModal from "../UI/modal/MyModal" 
import MyButton from "../UI/button/MyButton"
import Loader from "../UI/loader/Loader";
import Pagination from "../UI/pagination/Pagination";

import PostService from "../../API/PostService";
import { useFetching } from "../../hooks/useFetching"
import { getPagesCount } from "../../utils/pages"

export default function PostsPage() {

  const [posts, setPosts] = useState( [] )
  const [filter, setFilter] = useState( {sort: "", query: ""} )
  const [modal, setModal] = useState(false)

  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  const [
    fetchPosts, 
    isPostsLoading, 
    postError
  ] = useFetching(async () => {
        const response = await PostService.getAll(limit, page)
        setPosts(response.data)
        const totalCount = response.headers['x-total-count']
        setTotalPages(
          getPagesCount(totalCount, limit)
        )
  })

  function changePage(page) {
    setPage(page)
  }

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

  useEffect(() => {
    fetchPosts()
  }, [page])

  return (
    <div className="App">
      <h1 className="title">
        Список постов
      </h1>
      <div style={{display: "flex", gap: "10px", marginBottom: "10px"}}>
        <MyButton 
          onClick={
            () => setModal(true)
          }>
          Создать свой пост
        </MyButton>
        <MyButton onClick={fetchPosts}>
          Посты с сервера
        </MyButton>
      </div>
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
        postError &&
          <h1>Произошла ошибка {postError}</h1>
      }
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
      <Pagination
        totalPages={totalPages}
        page={page} 
        changePage={changePage}
      />
    </div>
  );
}
