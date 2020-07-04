//@ts-check
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const generateJwtToken = require('../helpers/gnerateJwtToken');
const gnerateJwtToken = require('../helpers/gnerateJwtToken');

router.post('/signup', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    if (!email || !password || !name) {
        return res.status(400).json({ msg: 'please include all fields' });
    }

    User.findOne({ email }).then((user) => {
        if (user) {
            return res.status(400).json({ msg: 'email already exists' });
        }
        const newUser = new User({
            name,
            email,
            password,
        });

        newUser.password = bcrypt.hash(password, 10, async (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            try {
                await newUser.save();
                const token = generateJwtToken({ _id: newUser._id });
                res.status(201).json({ user: newUser, token });
            } catch (error) {
                res.status(500).end();
                console.log(error);
            }
        });
    });
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res
            .status(400)
            .json({ msg: 'please include email and password' });

    let user;
    try {
        user = await User.findOne({ email });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'something went wrong' });
    }
    if (!user)
        return res.status(404).json({ msg: 'Invalide email or password' });
    bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
            if (isMatch) {
                const token = gnerateJwtToken({ _id: user._id });
                return res.json({ user, token });
            } else {
                return res
                    .status(401)
                    .json({ msg: 'Invalide eamil or password' });
            }
        })
        .catch((e) => console.log(e));
});

module.exports = router;
