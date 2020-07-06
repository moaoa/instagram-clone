const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../helpers/auth');
const axios = require('axios').default;

router.get('/', async (req, res) => {
    const posts = await Post.find().populate('createdBy', 'name _id');
    res.json({ posts });
});

router.get('/myposts', auth, async (req, res) => {
    try {
        const posts = await Post.find({ createdBy: req.user._id });
        res.json({ posts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'something went wrong' });
    }
});

router.post('/', auth, async (req, res) => {
    const { title, body, imgUrl } = req.body;
    console.log('img url: ', imgUrl);

    if (!title || !body)
        return res.status(400).json({ msg: 'Provide All Fields' });
    const post = new Post({ title, body, createdBy: req.user, imgUrl });
    try {
        await post.save();

        return res.status(201).json({ post });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Something Went Wrong' });
    }
});

module.exports = router;
