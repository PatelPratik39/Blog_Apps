import React from "react";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

const Post = ({ _id, title, summery, createdAt, content, cover, author }) => {
  return (
    <div className="post">
      <div className="image">
        <Link to={`post/${_id}`}>
          <img
            src={`http://localhost:4000/`+cover}
            alt="img"
          />
          {/* <img src={`http://localhost:4000/uploads/${cover}`} alt="img" /> */}
        </Link>
      </div>
      <div className="texts">
        <Link to={`post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <span className="author">{author.username}</span>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summery">{summery}</p>
      </div>
    </div>
  );
};

export default Post;












// import { formatISO9075 } from "date-fns";
// import { Link } from "react-router-dom";

// export default function Post({
//   _id,
//   title,
//   summary,
//   cover,
//   content,
//   createdAt,
//   author
// }) {
//   return (
//     <div className="post">
//       <div className="image">
//         <Link to={`/post/${_id}`}>
//           <img src={"http://localhost:4000/" + cover} alt="" />
//         </Link>
//       </div>
//       <div className="texts">
//         <Link to={`/post/${_id}`}>
//           <h2>{title}</h2>
//         </Link>
//         <p className="info">
//           <a className="author">{author.username}</a>
//           <time>{formatISO9075(new Date(createdAt))}</time>
//         </p>
//         <p className="summary">{summary}</p>
//       </div>
//     </div>
//   );
// }
