const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Curve = new Schema(
    {
        course: { type: String, require: true },
        username : { type: String, require: true },
        bound_a: { type: String, require: true },
        bound_b: { type: String, require: true },
        bound_c: { type: String, require: true },
        bound_d: { type: String, require: true },
        time: { type: Number, required: true }
    },
    {
        collection: 'curves'
    }
);

module.exports = mongoose.model('curve', Curve, 'curves');