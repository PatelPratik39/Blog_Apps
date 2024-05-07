import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./css/page2.css";

const Page2 = () => {
  const [Blogs, setBlogs] = useState();
  useEffect(() => {
    const fetch = async () => {
      try {
        await axios
          .get("http://localhost:3001/api/v1/recentBlogs/")
          .then((res) => {
            // console.log(res.data);
            setBlogs(res.data.data);
          });
      } catch (error) {
        alert("Some error occured");
        console.log(error);
      }
    };
    fetch();
  }, []);
  //   console.log(Blogs);
  return (
    <>
      <div className="page container">
        {Blogs &&
          Blogs.map((item, i) => (
            <div key={item._id}>
              <Link className="link-front-page" to={`/blogsPage/${item._id}`}>
                <h1>{item.title}</h1>
              </Link>
              <p>{item.description.slice(0, 500)} ...</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default Page2;
