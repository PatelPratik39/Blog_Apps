import React from "react";
import "../App.css";
import NavBar from "../src/components/Navbar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WriteBlogs from "./pages/WriteBlogs";
import Blogs from "./pages/Blogs";
import BlogsPage from "./components/BlogsPage/BlogsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogsPage/:id" element={<BlogsPage />} />
          <Route path="/writeBlogs" element={<WriteBlogs title={"Write"} />} />
          <Route
            path="/updateBlog/:id"
            element={<WriteBlogs title={"Update"} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
