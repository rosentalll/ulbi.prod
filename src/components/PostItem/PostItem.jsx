import React from "react";
import cl from "./PostItem.module.css"

import { useNavigate } from "react-router-dom";

import MyButton from "../UI/button/MyButton";


export default function PostItem(
    { 
        title, 
        body, 
        id, 
        removePost 
    }
) {
    const router = useNavigate()
    return (
        <li className={cl.post} key={id}>
            <div>
                <strong>{`${id} ${title}`}</strong>
                <p>{body}</p>
            </div>
            <div className={cl.post__buttons}>
                <MyButton onClick={() => removePost(id)}>
                    Удалить
                </MyButton>
                <MyButton onClick={() => router(`/posts/${id}`)}>
                    Открыть
                </MyButton>
            </div>
        </li>
    )
}