import React from "react";
import "./PostCard.css";

const PostCard = () => {
  return (
    <>
      <div className="card mb-3">
        <div className="row g-0">
          {/* Set the width of the image column to 100% */}
          <div className="col-md-4" style={{ width: "100%" }}>
            {/* Set the image width to 100% and make it responsive */}
            <img
              src="/post1.jpg"
              className="card-img-top img-fluid"
              alt="..."
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p className="card-text">
                <small className="text-body-secondary">
                  Last updated 3 mins ago
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;

// src="/post1.jpg"
