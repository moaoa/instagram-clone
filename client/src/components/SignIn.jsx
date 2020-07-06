import React from 'react';
import { Link } from 'react-router-dom';

export default function SignIn() {
    return (
        <div className="auth-card">
            <div className={'card'}>
                <div className="input-field">
                    <h2>sign In</h2>
                    <input placeholder="   email" type="email" />
                    <input placeholder="   password" type="password" />
                    <button
                        class="btn waves-effect waves-light #1e88e5 blue darken-1"
                        type="submit"
                        name="action"
                    >
                        sign in
                    </button>
                    <h5>
                        <Link to="/signup">don't have an account ?</Link>
                    </h5>
                </div>
            </div>
        </div>
    );
}
