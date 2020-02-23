const User = require('../models/user-model')
const jwt = require('jsonwebtoken');

AuthenticateUser = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an email',
        })
    }

    await User.findOne({ email: req.params.email }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        } else {
            


        }
    }).catch(err => console.log(err))


};



RegisterUser = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a movie',
        })
    }

    const user = new User(body)

    if (!user) {
        return res.status(400).json({ success: false, error: err })
    }

    user
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'User registered!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'User not registered!',
            })
        })
}


module.exports = {
    RegisterUser,
}