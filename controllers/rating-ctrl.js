const Rating = require('../models/rating-model');

/**
 * Function to create a rating on the database
 */
createRating = (req, res) => {

    // parsing body
    const body = req.body;
    // error checking
    if (!body) {
        return res.status(401).json({
            success: false,
            error: 'You must provide a rating',
        });
    }

    let rating_data = {
        course: body.course,
        username: body.user,
        rating: body.rating
    };

    // create rating model
    const rating = new Rating(rating_data);

    // error checking if rating model was successfully created
    if (!rating) {
        console.error('Failed to create new Rating document');
        return res.status(401).json({ success: false, error: "Failed in creating new Rating document" });
    }

    // saving the rating to the database
    rating
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                message: 'Rating created!',
            });
        })
        .catch((error) => {
            console.log('Rating not created!');
            console.error(error);
            return res.status(400).json({
                error,
                message: 'Rating not created!',
            });
        });
}

/**
 * Retrieve all the ratings
 */
getRatings = async (req, res) => {

    await Rating.find({}, (err, ratings) => {
        // error handling
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        // return curves
        return res.status(200).json({ success: true, data: ratings });

    }).catch(err => console.log(err))
}

module.exports = {
    createRating,
    getRatings,
}