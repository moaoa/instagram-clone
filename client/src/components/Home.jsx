import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("/posts").then((result) => {
      if (result.status === 200) return setPosts(result.data.posts);
      else console.log(result);
    });
  }, []);
  return (
    <div className="home">
      {posts.map((post, i) => (
        <div className="card" key={i}>
          <div className="card-image">
            <img src={post.imgUrl} alt="" />
          </div>
          <div className="card-content">
            <i class="material-icons" style={{ color: "red" }}>
              favorite
            </i>
            <h4 className="card-title">{post.title} </h4>
            <p> {post.body} </p>
            <input type="text" placeholder="add comment" />
          </div>
        </div>
      ))}
    </div>
  );
}
