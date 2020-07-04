const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    },
    img: {
        type: String,
        default: 'no img',
    },
});

module.exports = mongoose.model('Post', Schema);
