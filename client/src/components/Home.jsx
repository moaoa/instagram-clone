import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('/posts').then((result) => {
            console.log(result);

            if (result.status === 200) return setPosts(result.data.posts);
        });
    }, []);
    return (
        <div>
            <h1>home</h1>
            {posts.map((post, i) => (
                <div key={i}>{post.title}</div>
            ))}
        </div>
    );
}
