import axios from "axios";
import React, { useEffect, useState } from "react";
import "./css/Blogs.css";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState();

  useEffect(() => {
    const fetch = async () => {
      // await axios.get("https://blog-apps-1-n51a.onrender.com/api/v1/getAll");
      await axios
        .get("https://blog-apps-1-n51a.onrender.com/api/v1/")
        .then((res) => setBlogs(res.data.data));
    };
    fetch();
  }, []);
  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center my-3">
          {blogs &&
            blogs.map((item, i) => (
              <div className="col-lg-3 blog-card m-3 p-3" key={i}>
                <Link to={`/blogsPage/${item._id}`}>
                  <h4> {item.title}</h4>
                </Link>
                <p>{item.description.slice(0, 400)} ...</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Blogs;
