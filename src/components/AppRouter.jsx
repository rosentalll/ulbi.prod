import React from "react";
import { Routes, Route } from "react-router-dom";
import PostsPage from "./pages/PostsPage";
import AboutPage from "./pages/AboutPage";
import Error from "./pages/ErrorPage";
import PostIdPage from "./pages/PostIdPage";

export default function AppRouter() {
    return (
        <Routes>
          <Route 
            path="/posts" 
            element={<PostsPage />} 
          />
          <Route 
            path="/posts/:id" 
            element={<PostIdPage />} 
          />
          <Route 
            path="/about" 
            element={<AboutPage />} 
          />
          <Route 
            path="*" 
            element={<Error />}
          />
        </Routes>
    )
}