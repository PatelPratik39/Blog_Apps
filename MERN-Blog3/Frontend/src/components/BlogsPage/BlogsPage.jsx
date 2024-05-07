import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./BlogsPage.css";

const BlogsPage = () => {
  const [blog, setBlog] = useState(null);
  const id = useParams().id;
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/getBlog/${id}`
        );
        setBlog(response.data.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  return (
    <>
      <div className="page container">
        <div className="my-3">
          {blog && (
            <div>
              <h1>{blog.title}</h1>
              <p className="blogsPagep mt-5">{blog.description}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogsPage;
