import React from "react";
import MyButton from "./UI/button/MyButton";

export default function PostItem(
    { 
        title, 
        content, 
        id, 
        removePost 
    }
) {
    return (
        <li className="post" key={id}>
            <div className="post-content">
                <strong>{title}</strong>
                <p>{content}</p>
            </div>
            <div className="post-buttons">
                <MyButton onClick={() => removePost(id)}>Удалить</MyButton>
            </div>
        </li>
    )
}