const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema(
    {
        postid: {type: String, required: true},
        content: { type: String, required: true },
        user: { type: String, required: true },
        time: { type: Number, required: true }
    },
    {
        collection: 'comments'
    }
);

module.exports = mongoose.model('comment', Comment, 'comments');