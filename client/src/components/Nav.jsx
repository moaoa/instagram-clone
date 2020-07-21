import React, { useContext, useState } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../App';
import Modal from 'react-modal';

import { usersApi } from '../apis';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        color: 'black',
    },
};

Modal.setAppElement('#root');
export default function Nav() {
    const { submitted, setSubmitted } = useState(false);
    let subtitle;
    const [isOpen, setIsOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const { state, logOut } = useContext(GlobalContext);

    function opneModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    return (
        <nav>
            <div className="nav-wrapper white px-2 ">
                <Link
                    to={state.user ? '/' : 'signup'}
                    className="brand-logo left"
                >
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
                                <i
                                    onClick={opneModal}
                                    className="material-icons "
                                    style={{ color: 'black' }}
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
            <Modal
                isOpen={isOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="examle modal"
            >
                <h2
                    style={{ color: 'black' }}
                    ref={(_subtitle) => (subtitle = _subtitle)}
                ></h2>
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
                                    <h2>search for users</h2>

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
                                    onClick={closeModal}
                                >
                                    <Link to={`/userProfile/${user._id}`}>
                                        {user.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Formik>

                <button className="btn" onClick={closeModal}>
                    close
                </button>
            </Modal>
        </nav>
    );
}
