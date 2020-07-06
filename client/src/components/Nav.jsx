import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <nav>
            <div className="nav-wrapper white px-2 ">
                <Link to="/" className="brand-logo left">
                    Instagram
                </Link>
                <ul id="nav-mobile" className="right ">
                    <li>
                        <Link to="/signin">Sign in</Link>
                    </li>
                    <li>
                        <Link to="/signup">Sign Up</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link to="/create-post">Create Post</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
