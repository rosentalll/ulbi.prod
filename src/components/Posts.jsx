import React from "react";
import PostItem from "./PostItem";

export default function Posts({ posts, removePost }) {
    return (
        <ul className="posts">
            {
                posts.map(
                    post => <PostItem {...post} removePost={removePost} />
                )
            }
        </ul>
    )
}