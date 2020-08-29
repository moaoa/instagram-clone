import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../App';
import { postsApi } from '../apis/index';
import Loader from './loader';
import { useState } from 'react';

export default function Profile() {
    const { state, addMyPosts } = useContext(GlobalContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        postsApi
            .get('/myposts')
            .then((res) => {
                console.log(res);
                if (res.status == 200) {
                    addMyPosts(res.data.posts);
                } else {
                    console.log(res.msg, res.status);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    const url =
        state.user?.imgUrl ||
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

    if (loading) return <Loader />;

    return (
        <div className="profile">
            <div className="profile-details">
                <div>
                    <img src={url} alt="user" />
                </div>
                <div>
                    <h3>{state.user?.name}</h3>
                    <div>
                        <span>{state.userPosts?.length} posts</span>
                        <span>{state.user?.followers.length} followers</span>
                        <span>{state.user?.followings.length} follewing</span>
                    </div>
                </div>
            </div>
            <div className="gallery">
                {state.userPosts?.map((post) => (
                    <div key={post._id}>
                        <img src={post.imgUrl} alt="post" />
                        <h4>{post.title}</h4>
                        <h6>{post.body}</h6>
                    </div>
                ))}
                {state.userPosts.length === 0 && <div>no posts</div>}
            </div>
        </div>
    );
}
