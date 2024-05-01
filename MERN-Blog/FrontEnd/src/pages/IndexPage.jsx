import Post from "../Post";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
        console.log(posts);
      });
    });
  }, []);
  return (
    <>
    {/* <Post /> */}
      {/* getting a post from post */}
      {posts.length > 0 &&
        posts.map((post) => <Post key={post._id} {...post} />)}
    </>
  );
}









// import React, { useEffect } from "react";
// import Post from "../Post";

// const IndexPage = () => {

//   useEffect(() => {
//     fetch("/http://localhost:4000/post").then((response) => {
//       response.json((posts) => {
//         console.log(posts);
//       });
//     });
//   }, []);
//   return (
//     <>
//       <Post />
//       <Post />
//       <Post />
//       <Post />
//     </>
//   );
// };

// export default IndexPage;
