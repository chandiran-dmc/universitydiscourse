const Curve = require('../models/curve-model');

/**
 * Function to create a post on the database
 */
createCurve = (req, res) => {

    // parsing body
    const body = req.body;
    // error checking
    if (!body) {
        return res.status(401).json({
            success: false,
            error: 'You must provide a post',
        });
    }

    let curve_data = {
        course: body.title,
        username: body.user,
        bound_a: body.tag[0],
        bound_b: body.tag[1],
        bound_c: body.tag[2],
        bound_d: body.tag[3],
        time: body.time
    };

    // create curve model
    const curve = new Curve(curve_data);

    // error checking if curve model was successfully created
    if (!curve) {
        console.error('Failed to create new Curve document');
        return res.status(401).json({ success: false, error: "Failed in creating new Curve document" });
    }

    // saving the curve to the database
    curve
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                message: 'Curve created!',
            });
        })
        .catch((error) => {
            console.log('Curve not created!');
            console.error(error);
            return res.status(400).json({
                error,
                message: 'Curve not created!',
            });
        });
}

getCurves = async (req, res) => {

    await Curve.find({}, (err, curves) => {
        // error handling
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        // result checking
        if (!curves.length) {
            return res
                .status(402)
                .json({ success: false, error: `Curves not found` });
        }
        // return curves
        return res.status(200).json({ success: true, data: curves });

    }).catch(err => console.log(err))
}

module.exports = {
    createCurve,
    getCurves,
}