import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../../hooks/useFetching";
import PostService from "../../API/PostService";
import Loader from "../UI/loader/Loader";


export default function PostIdPage() {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])

    const [fetchPostsById, isLoading, error] = useFetching( async (id) => {
        const response = await PostService.getById(params.id)
        setPost(response.data)
    })
    const [fetchComments, isComLoading, comError] = useFetching( async (id) => {
        const response = await PostService.getCommentsByPostId(params.id)
        setComments(response.data)
    })

    useEffect(()=> {
        fetchPostsById(params.id)
        fetchComments(params.id)
    }, [])
    console.log(comments)
    return (
        <div>
            <h1>
                Вы открыли страницу поста {params.id}
            </h1>
            <div>
                {
                    isLoading ?
                    <Loader /> :
                    <div> {post.id} {post.title}</div>
                }
            </div>
            <h1>
                Комментарии
            </h1>
            <div>
                {
                    isComLoading ?
                    <Loader /> :
                    comments.map(
                        comm =>
                            <div>
                                <h3 style={{margin: "15px 0 0 0"}}>
                                    {comm.email}
                                </h3>
                                <div>
                                    {comm.body}
                                </div>
                            </div>
                    )
                }
            </div>
        </div>
    )
}