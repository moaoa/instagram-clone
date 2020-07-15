const express = require('express');
const app = express();
if (process.env.NODE_ENV !== 'production') {
    app.use(require('morgan')('tiny'));
    require('dotenv').config();
}

const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const mongoUri = process.env.MONGOURI;
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/users');
const auth = require('./helpers/auth');

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
const db = mongoose.connection;
db.on('open', () => console.log('mongo connected'));
db.on('error', () => console.log('mongo connection error'));

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/auth', authRoute);
app.use('/posts', postsRoute);
app.use('/users', auth, usersRoute);
app.get('/', (req, res) => {
    res.json({ msg: 'hello' });
});

app.listen(port, () => `server runnig on port ${port}`);
