import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

export default function Form({ createPost }) {
    const [post, setPost] = useState({title: '', content: ''})

    function handleSubmit(e) {
        e.preventDefault()
        createPost(post)
        setPost({title: '', content: ''})
    }

    return (
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <MyInput 
                placeholder="Введите заголовок" 
                value={post.title}
                onChange={
                    (e) => setPost({...post, title: e.target.value})
                }
            />
            <MyInput 
                placeholder="Введите контент"
                value={post.content}
                onChange={
                    (e) => setPost({...post, content: e.target.value})
                }
            />
            <MyButton>
                Создать пост
            </MyButton>
        </form>
    )
}