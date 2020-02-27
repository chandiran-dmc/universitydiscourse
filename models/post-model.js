const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema(
    {
        // Pid should be a unique value by hashing the time + username
        pid: { type: Number, required: true},
        title: { type: String, require: true},
        user: { type: String, required: true },
        type: { type: String, required: true },
        tag: { type: [String], required: true },
        count: { type: Number, required: true },
        comments: { type: [String], required: true },
        content: { type: String, required: true },
    },
    { 
        timestamps: true
    },
);

module.exports = mongoose.model('post', Post);