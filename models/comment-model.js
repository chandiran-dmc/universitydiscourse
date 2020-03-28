const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema(
    {
        title: { type: String, require: true},
        user: { type: String, required: true },
        type: { type: String, required: true },
        tag: { type: [String], required: true },
        count: { type: Number, required: true },
        content: { type: String, required: true },
        time: { type: Number, required: true }
    },
    {
        collection: 'comments'
    }
);

module.exports = mongoose.model('comment', Comment, 'comments');