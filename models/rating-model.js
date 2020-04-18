const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Rating = new Schema(
    {
        course: { type: String, require: true },
        username : { type: String, require: true },
        rating: { type: Number, require: true}
    },
    {
        collection: 'ratings'
    }
);

module.exports = mongoose.model('rating', Rating, 'ratings');