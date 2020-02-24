const User = require('../models/user-model')
const jwt = require('jsonwebtoken');

AuthenticateUser = (req, res) => {
    const body = req.body
    const { email, password } = body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an email',
        })
    }

    User.findOne({ email }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        } else {            
            user
            .isCorrectPassword(password, function(err, same) {
                if (err) {
                    res.status(500)
                    .json({error: 'Internal error please try again'});
                } else if (!same) {
                    res.status(401)
                    .json({error: 'Incorrect email or password'});
                }
                else {
                    return res
                    .json({ success: false, error: `Password was correct` })
                }
            })                         
        }
    }).catch(err => console.log(err))
};

ChangePassword = (req, res) => {
    const body = req.body
    const { email, password } = body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an email',
        })
    }

    User.findOne({ email }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        } else {            
            user
            .isCorrectPassword(password, function(err, same) {
                if (err) {
                    res.status(500)
                    .json({error: 'Internal error please try again'});
                } else if (!same) {
                    res.status(401)
                    .json({error: 'Incorrect email or password'});
                }
                else {
                    return res
                    .json({ success: false, error: `Password was correct` })
                }
            })                         
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
    AuthenticateUser,
    ChangePassword
}