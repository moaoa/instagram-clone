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
    imgUrl: {
        type: String,
    },
});

module.exports = mongoose.model('Post', Schema);
