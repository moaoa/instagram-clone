import React, { createContext, useReducer } from 'react';
import './App.css';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import CreatePost from './components/CreatePost';
import UserProfile from './components/UserProfile';
import PostsByFollowing from './components/PostsCreatedByFollowing';
import Nav from './components/Nav';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
import Profile from './components/Profile';
import { initialState } from './reducers/index';
import reducer from './reducers/index';
import * as actions from './actions/constants';

export const GlobalContext = createContext(initialState);

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const history = useHistory();
    const addUser = (user, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({
            type: actions.USER,
            payload: {
                user,
                token,
            },
        });
    };
    const addPost = (post) => {
        dispatch({ type: actions.ADD_POST, payload: post });
    };
    const getPosts = (posts) => {
        dispatch({ type: actions.GET_POSTS, payload: posts });
    };
    const logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({ type: actions.LOG_OUT });
    };
    const addMyPosts = (myPosts) => {
        dispatch({ type: actions.USER_POSTS, payload: myPosts });
    };
    const likePost = (post) => {
        dispatch({ type: actions.LIKE_POST, payload: post });
    };
    const unLikePost = (post) => {
        dispatch({ type: actions.UNLIKE_POST, payload: post });
    };
    const addComment = (post) => {
        dispatch({ type: actions.ADD_COMMENT, payload: post });
    };
    const followUser = ({ followers, followings }) => {
        dispatch({
            type: actions.FOLLOW_USER,
            payload: {
                followers,
                followings,
            },
        });
    };
    if (!state.user) history.push('/signup');
    return (
        <GlobalContext.Provider
            value={{
                state,
                addUser,
                addPost,
                getPosts,
                logOut,
                addMyPosts,
                likePost,
                unLikePost,
                addComment,
                followUser,
            }}
        >
            <div className="App">
                <Nav />
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
                <Route path="/signin">
                    <SignIn />
                </Route>
                <Route path="/create-post">
                    <CreatePost />
                </Route>
                <Route path="/profile">
                    <Profile />
                </Route>
                <Route path="/userProfile/:userId">
                    <UserProfile />
                </Route>
                <Route path="/postsByFollowing">
                    <PostsByFollowing />
                </Route>
            </div>
        </GlobalContext.Provider>
    );
}

export default App;
