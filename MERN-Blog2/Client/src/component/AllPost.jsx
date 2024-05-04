import React, { useState, useEffect } from "react";
import { fetchAllPost } from "../API/index.js";

const AllPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const data = await fetchAllPost();
        setPosts(data.posts); // Set posts from the fetched data
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    getAllPosts();
  }, []);

  return(
    <div>
      <h1>All posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id} >
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>Author: {post.author}</p>
            <p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllPost;
