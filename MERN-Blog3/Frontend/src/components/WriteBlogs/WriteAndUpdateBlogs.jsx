import React, { useEffect, useState } from "react";
import "../WriteBlogs/writeAndUpdate.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const WriteAndUpdateBlogs = ({ titleName }) => {
  const [blog, setBlog] = useState({ title: "", description: "" });
  const id = useParams().id;
  const history = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };
  const submit = async () => {
    try {
      if (titleName === "Write") {
        const response = await axios.post(
          "https://blog-apps-1-n51a.onrender.com/api/v1/post",
          blog
        );
        alert(response.data.message);
        setBlog({ title: "", description: "" });
      } else {
        const response = await axios.put(
          `https://blog-apps-1-n51a.onrender.com/api/v1/updateBlog/${id}`,
          blog
        );
        alert(response.data.message);
        history(`/blogsPage/${id}`);
      }
    } catch (error) {
      console.error(
        "Error during blog operation:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to process blog operation");
    }
  };

  //   to get first post that needs tobe updated
  useEffect(() => {
    const fetch = async () => {
      if (titleName === "Update") {
        const response = await axios.get(
          `https://blog-apps-1-n51a.onrender.com/api/v1/getBlog/${id}`
        );
        // console.log(response.data.data);
        setBlog(response.data.data);
      }
    };
    fetch();
  }, [id, titleName]);
  return (
    <>
      <div className="container">
        <h3> {titleName} Blogs </h3>
        <div className="d-flex flex-column my-5">
          <input
            type="text"
            required
            className="form-text p-3"
            name="title"
            value={blog.title}
            placeholder="Title"
            onChange={handleChange}
          />
          <textarea
            name="description"
            value={blog.description}
            className="form-text p-3"
            id=""
            cols="30"
            rows="5"
            onChange={handleChange}
            placeholder="Description"
          ></textarea>
          <div className="mt-4">
            <button
              className="px-4 py-2 add-blog-btn "
              style={{ borderRadius: "10px" }}
              onClick={submit}
            >
              {titleName} Blog
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WriteAndUpdateBlogs;
