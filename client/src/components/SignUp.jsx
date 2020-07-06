import React from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
    return (
        <div className="auth-card">
            <div className={'card'}>
                <div className="input-field">
                    <h2>sign up</h2>
                    <input placeholder="   name" type="text" />
                    <input placeholder="   email" type="email" />
                    <input placeholder="   password" type="password" />
                    <button
                        class="btn waves-effect waves-light #1e88e5 blue darken-1"
                        type="submit"
                        name="action"
                    >
                        Sign Up
                    </button>
                    <h5>
                        <Link to="/signin">already have an account ?</Link>
                    </h5>
                </div>
            </div>
        </div>
    );
}
