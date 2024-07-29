import React from "react";
import PostItem from "./PostItem";

export default function Posts({ posts, removePost }) {
    return (
        !posts.length ? 
            <h2 className="title-2">Посты не найдены!</h2> 
                :
            <ul className="posts">
                {
                    posts.map(
                        post => 
                            <PostItem 
                                {...post} 
                                removePost={removePost} 
                            />
                    )
                }
            </ul>
    )
}