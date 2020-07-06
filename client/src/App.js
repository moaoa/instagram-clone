//@ts-check
import React from 'react';
import './App.css';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import CreatePost from './components/CreatePost';
import Nav from './components/Nav';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Profile from './components/Profile';

function App() {
    return (
        <div className="App">
            <Router>
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
            </Router>
        </div>
    );
}

export default App;
