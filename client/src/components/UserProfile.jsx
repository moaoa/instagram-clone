import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../App';
import { usersApi } from '../apis/index';
import { useParams } from 'react-router-dom';

export default function UserProfile() {
    const { state } = useContext(GlobalContext);
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const [userPosts, setUserPosts] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);

    const handleClick = () => {
        if (isFollowing) {
            usersApi
                .put('/unfollow/' + user._id)
                .then((res) => {
                    console.log(res);
                    if (res.status === 200) console.log(res.data);
                })
                .catch(console.log);
        } else {
            usersApi.put('/follow/' + user._id).then((res) => {
                console.log(res);
            });
        }
    };
    useEffect(() => {
        usersApi.get('/' + userId).then((res) => {
            console.log(res);
            if (res.status == 200) {
                setUser(res.data.user);
                setUserPosts(res.data.userPosts);
                setIsFollowing(state.user.followings.includes(user._id));
            } else console.log(res.msg, res.status);
        });
    }, []);
    if (userId == null) return 'no user id wase sent ';
    const url =
        user?.imgUrl ||
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

    return (
        <div className="profile">
            <div className="profile-details">
                <div>
                    <img src={url} alt="user" />
                    <div className="btn" onClick={}>
                        {isFollowing ? 'unfollow' : 'follow'}
                    </div>
                </div>
                <div>
                    <h3>{user.name}</h3>
                    <div>
                        <span>{user.posts?.length || 0} posts</span>
                        <span>{user.followers?.length || 0} followers</span>
                        <span>{user.followings?.length || 0} follewing</span>
                    </div>
                </div>
            </div>
            <div className="gallery">
                {userPosts?.map((post) => (
                    <div key={post._id}>
                        <img src={post.imgUrl} alt="post" />
                        <h4>{post.title}</h4>
                        <h6>{post.body}</h6>
                    </div>
                ))}
                {user.posts?.length === 0 && <div>no posts</div>}
            </div>
        </div>
    );
}
