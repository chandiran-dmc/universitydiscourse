const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Grade = new Schema(
    {
        course: { type: String, require: true},
        user: { type: String, required: true },
        score: { type: Number, required: true },
        grade: { type: String, required: true },
        time: { type: Number, required: true }
    },
    {
        collection: 'grades'
    }
);

module.exports = mongoose.model('grade', Grade, 'grades');