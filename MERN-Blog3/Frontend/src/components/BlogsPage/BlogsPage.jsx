import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./BlogsPage.css";
import { Link } from "react-router-dom";
import { MdEditSquare } from "react-icons/md";

const BlogsPage = () => {
  const [blog, setBlog] = useState(null);
  const id = useParams().id;
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // const response = await axios.get(
        //   `http://localhost:3001/api/v1/getBlog/${id}`
        // );
        const response = await axios.get(
          `https://blog-apps-1-n51a.onrender.com/api/v1/getBlog/${id}`
        );
        // console.log(response.data.data);
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
              <Link
                to={`/updateBlog/${blog._id}`}
                className="d-flex justify-content-end editIcon"
              >
                <MdEditSquare />
              </Link>
              <h1 className="mt-2">{blog.title}</h1>
              <p className="blogsPagep mt-3">{blog.description}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogsPage;
