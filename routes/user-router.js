const express = require('express')

const UserCtrl = require('../controllers/user-ctrl')

const router = express.Router()

router.post('/register', UserCtrl.RegisterUser)
router.post('/authenticate', UserCtrl.AuthenticateUser)
router.post('/changepass', UserCtrl.ChangePassword)
router.post('/changeemail', UserCtrl.ChangeEmail)
router.post('/deleteuser', UserCtrl.DeleteUser)
router.post('/recover', UserCtrl.RecoveryEmail)
router.post('/recoverpassword', UserCtrl.RecoverPassword)
router.post('/getuser', UserCtrl.FindUser)
router.post('/updateusertags', UserCtrl.UpdateUserTags)

module.exports = router