const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: { type: String, require: true},
    },
    {
        collection: 'courses'
    }
);

module.exports = mongoose.model('course', Course, 'courses');