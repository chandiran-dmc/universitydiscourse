const express = require('express')

const UserCtrl = require('../controllers/user-ctrl')

const router = express.Router()

router.post('/user', UserCtrl.RegisterUser)
router.post('/authenticate', UserCtrl.AuthenticateUser)
router.post('/changepass', UserCtrl.ChangePassword)

module.exports = router