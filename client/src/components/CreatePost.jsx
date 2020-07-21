import React, { useState, useEffect, useContext } from 'react';
import { postsApi, upload } from '../apis/index';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../App';
import Loader from 'react-loader-spinner';

export default function CreatePost() {
    const { addPost } = useContext(GlobalContext);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [file, setFile] = useState('');
    const [loading, setLoading] = useState(false);
    const [imgUrl, setImgUrl] = useState('');
    const history = useHistory();

    useEffect(() => {
        const submitPost = async () => {
            try {
                const result = await postsApi.post('/', {
                    title,
                    body,
                    imgUrl,
                });
                addPost(result.data.post);
                history.push('/');
            } catch (error) {
                console.log(error);
            }
        };
        if (imgUrl) submitPost();
    }, [imgUrl]);
    const handleSubmit = () => {
        console.log('submitted');

        if (!title || !body || !file || loading) return;

        setLoading(true);

        upload(file)
            .then((url) => {
                setImgUrl(url);
            })
            .catch((e) => console.log(e));
    };
    if (loading)
        return (
            <div className="loader">
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000}
                />
            </div>
        );
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
                onClick={() => handleSubmit()}
                className="btn waves-effect waves-light #1e88e5 blue darken-1"
                type="submit"
                name="action"
            >
                Submit
            </button>
        </div>
    );
}
