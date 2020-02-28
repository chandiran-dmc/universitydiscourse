const User = require('../models/user-model')
const nodemailer = require('nodemailer')

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

RecoveryEmail = (req, res) => {
    const body = req.body
    const { email } = body;
    
    if (!body) {
        return res.status(400).json({
                success: false,
                error: 'You must provide an email',
        })
    }
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'babytaetae123tae@gmail.com',
            pass: 'babytae!123'
        }

    });

    //var str = 'rewati'
    //var link = str.link('localhost:3001/api/recoverpassword');
    const mailOptions = {
        from: 'babytaetae123tae@gmail.com',
        to: email,
        subject: 'Password reset',
        text: 'This is the link to change password: \n\n' + 'http://localhost:3001/api/recoverpassword' + '\n\n Lets do it yaay!',
        //text: 'this is the text'
    };

    transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
            console.error('There was an email error: ', err);

        } else {
            console.log('here is response', response);
            res.status(200).json('recovery email sent');
        }

    })

};

ChangeEmail = (req, res) => {
    const body = req.body
    const { email, newemail } = body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an email, oldpassword and newpassword',
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
            user.email=newemail
                    user
                    .save()    
                    .then(() => {
                        return res.status(200).json({
                            success: true,
                            message: 'Email updated!',
                        })
                    })
                    .catch(error => {
                        return res.status(404).json({
                            error,
                            message: 'Email not updated!',
                        })
                    })                         
        }
    }).catch(err => console.log(err))
};


ChangePassword = (req, res) => {
    const body = req.body
    const { email, oldpassword, newpassword } = body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an email, oldpassword and newpassword',
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
            .isCorrectPassword(oldpassword, function(err, same) {
                if (err) {
                    res.status(500)
                    .json({error: 'Internal error please try again'});
                } else if (!same) {
                    res.status(401)
                    .json({error: 'Incorrect password'});
                }
                else {
                    //user.email=email
                    user.password=newpassword
                    user
                    .save()    
                    .then(() => {
                        return res.status(200).json({
                            success: true,
                            message: 'Password updated!',
                        })
                    })
                    .catch(error => {
                        return res.status(404).json({
                            error,
                            message: 'Password not updated!',
                        })
                    })
                }
            })                         
        }
    }).catch(err => console.log(err))
};

RecoverPassword = (req, res) => {
    const body = req.body
    const { email, newpassword } = body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an email, newpassword',
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
            user.password=newpassword
                    user
                    .save()    
                    .then(() => {
                        return res.status(200).json({
                            success: true,
                            message: 'Password updated!',
                        })
                    })
                    .catch(error => {
                        return res.status(404).json({
                            error,
                            message: 'Password not updated!',
                        })
                    })                        
        }
    }).catch(err => console.log(err))
};



RegisterUser = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a username',
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

DeleteUser = (req, res) => {
    const body = req.body
    const { email, password } = body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an email and a password',
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
                    .json({error: 'Incorrect password'});
                }
                else {
                    User.findOneAndDelete({ email }, (err, user) => {
                        if (err) {
                            return res.status(400).json({ success: false, error: err })
                        }                
                        if (!user) {
                            return res
                                .status(404)
                                .json({ success: false, error: `User not found` })
                        } else {                            
                            return res.status(200).json({ success: true, data: user })
                        }                        
                    })
                }
            })                         
        }
    }).catch(err => console.log(err))
};


module.exports = {
    RegisterUser,
    AuthenticateUser,
    ChangeEmail,
    ChangePassword,
    DeleteUser,
    RecoveryEmail,
    RecoverPassword
}