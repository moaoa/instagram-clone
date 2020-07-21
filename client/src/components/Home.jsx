import React, { useEffect, useContext, useState } from 'react';
import { GlobalContext } from '../App';
import { postsApi, fakeApi } from '../apis';
import { Link } from 'react-router-dom';

export default function Home() {
    const [send, setSend] = useState(true);
    const { state, getPosts, likePost, unLikePost, addComment } = useContext(
        GlobalContext
    );
    useEffect(() => {
        postsApi.get('/').then((result) => {
            if (result.status === 200) return getPosts(result.data.posts);
            else console.log(result);
        });
        // fakeApi.get("/").then((res) => {
        //   if (res.status === 200) return getPosts(res.data.posts);
        // });
    }, []);

    const sendLikeRequest = (postId) => {
        if (!send) return;
        setSend(false);
        postsApi
            .put('/like', { postId })
            .then((res) => {
                console.log(res);
                if (res.status === 200) return likePost(res.data);
                setSend(true);
            })
            .catch((e) => {
                console.log(e);
                setSend(true);
            });
    };
    const sendUnlikeRequest = (postId) => {
        postsApi
            .put('/unlike', { postId })
            .then((res) => {
                console.log(res);
                if (res.status === 200) unLikePost(res.data);
                setSend(true);
            })
            .catch(console.log);
    };

    const sendComment = (postId, text) => {
        postsApi
            .put('/comment', { postId, text })
            .then((res) => {
                if (res.status === 200) addComment(res.data.result);
            })
            .catch(console.log);
    };

    return (
        <div className="home">
            {state.posts.map((post, i) => (
                <div className="card" key={i}>
                    <div className="card-image">
                        <Link to={`/userProfile/${post.createdBy?._id}`}>
                            <h3>{post.createdBy?.name}</h3>
                        </Link>
                        <img src={post.imgUrl} alt="" />
                    </div>
                    <div className="card-content">
                        <div className="icons-box">
                            <span className="likes-counter">
                                {post?.likes.length} likes
                            </span>
                            {post?.likes.includes(state.user?._id) ? (
                                <i
                                    onClick={(e) => sendUnlikeRequest(post._id)}
                                    className="material-icons "
                                    style={{ color: 'blue' }}
                                >
                                    thumb_up
                                </i>
                            ) : (
                                <i
                                    onClick={(e) => sendLikeRequest(post._id)}
                                    class="material-icons"
                                >
                                    thumb_up
                                </i>
                            )}
                        </div>
                        <h4 className="card-title">{post.title} </h4>
                        <p> {post.body} </p>
                        {post.comments.map((comment) => (
                            <div className="comment" key={post._id}>
                                {comment.text}{' '}
                                <strong>by {comment.createdBy.name}</strong>
                            </div>
                        ))}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                sendComment(post._id, e.target.comment.value);

                                e.target.comment.value = '';
                            }}
                        >
                            <input
                                name="comment"
                                type="text"
                                placeholder="add comment"
                            />
                            <button
                                type="submit"
                                className="btn #1e88e5 blue darken-1"
                            >
                                <i className="material-icons">add</i>
                            </button>
                        </form>
                    </div>
                </div>
            ))}
        </div>
    );
}
