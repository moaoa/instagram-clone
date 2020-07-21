import React, { useState, useContext, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth, upload } from '../apis/index';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { GlobalContext } from '../App';
import Loader from './loader';

export default function SignUp() {
    const history = useHistory();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [img, setImg] = useState(null);
    const { addUser } = useContext(GlobalContext);
    const inputRef = useRef(null);
    if (loading) return <Loader />;
    return (
        <Formik
            initialValues={{ email: '', password: '', name: '' }}
            validationSchema={Yup.object().shape({
                name: Yup.string().max(10).required(),
                email: Yup.string()
                    .email('Invalid Email address')
                    .required('required'),
                password: Yup.string().min(6).required('required'),
                passwordConfirmation: Yup.string().oneOf(
                    [Yup.ref('password')],
                    'Password must match'
                ),
            })}
            onSubmit={(values) => {
                const { name, email, password } = values;
                setSubmitted(true);
                setLoading(true);

                if (!submitted) console.log(img);

                upload(img).then((imgUrl) => {
                    auth.post('/signup', {
                        name,
                        email,
                        password,
                        imgUrl,
                    }).then((res) => {
                        console.log(res);

                        if (res.status === 201) {
                            addUser(res.data.user, res.data.token);
                            history.push('/');
                        }
                    });
                });
            }}
        >
            <div className="auth-card">
                <Form>
                    <div className={'card'}>
                        <div className="input-field">
                            <h2>sign Up</h2>

                            <Field
                                name="name"
                                type="text"
                                placeholder="   name"
                            />
                            <ErrorMessage name="name" />

                            <Field
                                name="email"
                                type="email"
                                placeholder="   email"
                            />
                            <ErrorMessage name="email" />

                            <Field
                                name="password"
                                placeholder="    password"
                                type="password"
                            />
                            <ErrorMessage name="password" />
                            <Field
                                name="passwordConfirmation"
                                placeholder="    re-enter password"
                                type="password"
                            />
                            <ErrorMessage
                                name="passwordConfirmation"
                                component="div"
                            />
                            <div className="file-field input-field">
                                <div className="btn #1e88e5 blue darken-1">
                                    <span>File</span>
                                    <input
                                        name="img"
                                        type="file"
                                        onChange={(e) => {
                                            inputRef.current.value =
                                                e.target.files[0].name;
                                            setImg(e.target.files[0]);
                                        }}
                                    />
                                </div>
                                <div className="file-path-wrapper">
                                    <input
                                        className="file-path validate"
                                        type="text"
                                        ref={inputRef}
                                    />
                                </div>
                            </div>

                            <button
                                className="btn waves-effect waves-light #1e88e5 blue darken-1"
                                type="submit"
                                name="action"
                            >
                                sign up
                            </button>
                            <h5>
                                <Link to="/signin">
                                    don't have an account ?
                                </Link>
                            </h5>
                        </div>
                    </div>
                </Form>
            </div>
        </Formik>
    );
}
