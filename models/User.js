const mongoose = require('mongoose');
const { ObjectId } = mongoose.SchemaTypes;
const Schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
    },
    followers: [{ type: ObjectId, ref: 'User' }],
    followings: [{ type: ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('User', Schema);
