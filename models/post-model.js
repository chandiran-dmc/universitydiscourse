const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema(
    {
        title: { type: String, require: true},
        user: { type: String, required: true },
        type: { type: String, required: true },
        tag: { type: [String], required: true },
        count: { type: Number, required: true },
        comments: { type: [String], required: true },
        content: { type: String, required: true },
        time: { type: Number, required: true },
        reportArray: {type: [String], required: true},
        reportArrayindex: {type: Number, required: true},
        //isEditPost: { type: Number, required: false },
        //isReportPost: { type: Number, required: false },
        //mode: { type: Number, required: false },
        reportCount: { type:Number, required: true },
        //report: {type: Boolean, required: true},
        likeCount: {type: Number, required: true},
        upvoteCount: {type: Number, required: true},
        downvoteCount: {type: Number, required: true},


    },
    {
        collection: 'posts'
    }
);

module.exports = mongoose.model('post', Post, 'posts');