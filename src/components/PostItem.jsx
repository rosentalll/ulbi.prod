import React from "react";
import MyButton from "./UI/button/MyButton";

export default function PostItem(
    { 
        title, 
        body, 
        id, 
        removePost 
    }
) {
    return (
        <li className="post" key={id}>
            <div className="post-content">
                <strong>{`${id} ${title}`}</strong>
                <p>{body}</p>
            </div>
            <div className="post-buttons">
                <MyButton onClick={() => removePost(id)}>
                    Удалить
                </MyButton>
            </div>
        </li>
    )
}