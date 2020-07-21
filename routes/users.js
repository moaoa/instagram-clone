const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).select('-password');
        const userPosts = await Post.find({ createdBy: userId });
        res.json({ user, userPosts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error.message, stack: error.stack });
    }
});

router.get('/search/:searchTerm', async (req, res) => {
    const { searchTerm } = req.params;
    try {
        const users = await User.find()
            .where('name')
            .regex(`^${searchTerm}`)
            .select('name _id')
            .exec();
        res.json({ users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error.stack });
    }
});

router.put('/follow/:userId', async (req, res) => {
    const { userId } = req.params;

    let user, currentUser;
    try {
        user = await User.findById(userId).select('-password');
        if (!user.followers.includes(req.user._id))
            user.followers.push(req.user._id);

        currentUser = await User.findById(req.user._id).select('-password');

        if (!currentUser.followings.includes(user._id))
            currentUser.followings.push(user._id);

        await currentUser.save();
        await user.save();
        res.json({ user, currentUser });
    } catch (error) {
        res.status(500).json({ msg: error });
        console.log('my error', error);
    }
});
router.put('/unfollow/:userId', async (req, res) => {
    const { userId } = req.params;

    let user, currentUser;
    try {
        user = await User.findById(userId).select('-password');
        user.followers.pull(req.user._id);

        currentUser = await User.findById(req.user._id).select('-password');

        currentUser.followings.pull(user._id);

        await currentUser.save();
        await user.save();
        res.json({ user, currentUser });
    } catch (error) {
        res.status(500).json({ msg: error });
        console.log('my error', error);
    }
});

module.exports = router;
