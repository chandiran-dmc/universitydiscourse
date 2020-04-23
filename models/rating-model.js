const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Rating = new Schema(
    {
        course: { type: String, required: true },
        username : { type: String, required: true },
        rating: { type: Number, required: true}
    },
    {
        collection: 'ratings'
    }
);

module.exports = mongoose.model('rating', Rating, 'ratings');