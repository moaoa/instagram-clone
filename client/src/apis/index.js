import axios from 'axios';
const postsApi = axios.create({
    baseURL: '/posts',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWZkYmNhMmViODRjMzI0YjAxZWZiYWIiLCJpYXQiOjE1OTM5NTk5MzgsImV4cCI6MTU5NDA0NjMzOH0.eu1QEWbRlSeIM1O7gJQJtk_OYY8Y9QP-xKPyrfF3WsU`,
    },
});

export default postsApi;
