import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../App";

export default function Nav() {
  const { state, logOut } = useContext(GlobalContext);
  return (
    <nav>
      <div className="nav-wrapper white px-2 ">
        <Link to={state.user ? "/" : "signup"} className="brand-logo left">
          Instagram
        </Link>
        <ul id="nav-mobile" className="right ">
          {!state.user && (
            <>
              <li>
                <Link to="/signin">Sign in</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}

          {state.user && (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>

              <li>
                <Link to="/create-post">Create Post</Link>
              </li>

              <li>
                <button className="btn #757575 grey darken-1" onClick={logOut}>
                  log out
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
