import React, { useState } from 'react';
import axios from 'axios';
import postsApi from '../apis/index';
import { useHistory } from 'react-router-dom';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [file, setFile] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const submitPost = () => {
        if (!title || !body || !file || loading) return;
        const formDataBody = new FormData();
        formDataBody.append('file', file);
        formDataBody.append('upload_preset', 'insta-clone');
        formDataBody.append('cloud_name', 'dncpsh3iw');
        setLoading(true);

        axios
            .post(
                'https://api.cloudinary.com/v1_1/dncpsh3iw/image/upload',
                formDataBody
            )
            .then(async (res) => {
                console.log(res.data.url);

                const result = await postsApi.post('/', {
                    title,
                    body,
                    imgUrl: res.data.url,
                });
                history.push('/');
            })
            .catch((e) => console.log(e));
    };
    return (
        <div
            className="card input-field"
            style={{
                padding: '2rem',
                marginTop: '3.5rem',
                textAlign: 'center ',
            }}
        >
            <h3>Create New Post</h3>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="title"
            />
            <input
                type="text"
                onChange={(e) => setBody(e.target.value)}
                placeholder="body"
            />
            <div className="file-field input-field">
                <div className="btn #1e88e5 blue darken-1">
                    <span>File</span>
                    <input
                        type="file"
                        onChange={(e) => {
                            console.log(e.target);

                            setFile(e.target.files[0]);
                        }}
                    />
                </div>
                <div className="file-path-wrapper">
                    <input
                        className="file-path validate"
                        type="text"
                        value={file?.name}
                    />
                </div>
            </div>
            <button
                onClick={() => submitPost()}
                className="btn waves-effect waves-light #1e88e5 blue darken-1"
                type="submit"
                name="action"
            >
                Submit
            </button>
        </div>
    );
}
