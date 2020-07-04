//@ts-check
import React from 'react';
import './App.css';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SginIn from './components/SignIn';
import CreatePost from './components/CreatePost';

import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Router>
                <Route path="/" exact>
                    <Home />
                </Route>
            </Router>
        </div>
    );
}

export default App;
