const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema(
    {
        count: { type: Number, required: true }
    },
    {
        collection: 'comments'
    }
);

module.exports = mongoose.model('comment', Comment, 'comments');