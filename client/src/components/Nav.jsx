import React, { useContext, useState } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../App';
import Modal from './Modal/Modal';
import PopUp from './PopUp/PopUp';

import { usersApi } from '../apis';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export default function Nav() {
    const { submitted, setSubmitted } = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const { state, logOut } = useContext(GlobalContext);
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

    function toggleModal() {
        setIsOpen((prevState) => !prevState);
    }
    function toggleSidebar() {
        setSidebarIsOpen((prevState) => !prevState);
    }

    return (
        <nav>
            <div className="nav-wrapper white px-2 ">
                <div className="nemuTogller right " onClick={toggleSidebar}>
                    {' '}
                    <i class="material-icons">menu</i>
                </div>
                <Link
                    to={state.user ? '/' : 'signup'}
                    className="brand-logo left"
                >
                    Instagram
                </Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
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
                                <i
                                    onClick={toggleModal}
                                    className="material-icons "
                                    style={{
                                        color: 'black',
                                        cursor: 'pointer',
                                    }}
                                >
                                    search
                                </i>
                            </li>
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>

                            <li>
                                <Link to="/create-post">Create Post</Link>
                            </li>
                            <li>
                                <Link to="/postsByFollowing">Explore</Link>
                            </li>

                            <li>
                                <button
                                    className="btn #757575 grey darken-1"
                                    onClick={logOut}
                                >
                                    log out
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
            <PopUp isOpen={isOpen} clicked={toggleModal}>
                <h2 style={{ color: 'black' }}></h2>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={Yup.object({
                        name: Yup.string().required('required'),
                    })}
                    onSubmit={(values) => {
                        const { name } = values;
                        if (!submitted) {
                            usersApi
                                .get('/search/' + name)
                                .then((res) => {
                                    if (res.status === 200)
                                        setUsers(res.data.users);
                                })
                                .catch(console.log);
                        }
                        setSubmitted(true);
                    }}
                >
                    <div className="auth-card">
                        <Form>
                            <div className={'card'}>
                                <div className="input-field">
                                    <h4>search for users</h4>

                                    <Field
                                        name="name"
                                        type="text"
                                        placeholder="   enter user name"
                                    />
                                    <ErrorMessage name="name" />

                                    <button
                                        className="btn waves-effect waves-light #1e88e5 blue darken-1"
                                        type="submit"
                                        name="action"
                                    >
                                        search
                                    </button>
                                </div>
                            </div>
                        </Form>
                        <ul className="collections">
                            {users.map((user) => (
                                <li
                                    className="collection-item"
                                    key={Date.now()}
                                    onClick={toggleModal}
                                >
                                    <Link to={`/userProfile/${user._id}`}>
                                        {user.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Formik>

                <button
                    className="btn #1e88e5 blue darken-1"
                    onClick={toggleModal}
                >
                    close
                </button>
            </PopUp>

            <Modal isOpen={sidebarIsOpen} clicked={toggleSidebar}>
                <div className="mobileSidebar">
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
                                <i
                                    onClick={toggleModal}
                                    className="material-icons "
                                    style={{
                                        color: 'black',
                                        cursor: 'pointer',
                                    }}
                                >
                                    search
                                </i>
                            </li>
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>

                            <li>
                                <Link to="/create-post">Create Post</Link>
                            </li>
                            <li>
                                <Link to="/postsByFollowing">Explore</Link>
                            </li>

                            <li>
                                <button
                                    className="btn #757575 grey darken-1"
                                    onClick={logOut}
                                >
                                    log out
                                </button>
                            </li>
                        </>
                    )}
                </div>
            </Modal>
        </nav>
    );
}
