import React from "react";
import WriteAndUpdateBlogs from "../components/WriteBlogs/WriteAndUpdateBlogs";

const WriteBlogs = ({ title }) => {
  return (
    <div>
      <WriteAndUpdateBlogs titleName={title} />
    </div>
  );
};

export default WriteBlogs;
