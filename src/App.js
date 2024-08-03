import { BrowserRouter } from "react-router-dom";

import "./App.css";
import React from "react";

import Navbar from "./components/UI/navbar/Navbar";
import AppRouter from "./components/AppRouter";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  )
}
