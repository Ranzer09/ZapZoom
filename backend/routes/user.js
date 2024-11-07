const express = require('express')
const router = express.Router()

//controllers
const {loginUser,registerUser, checkEmail}= require('../controller/usercontroller')

//login route
router.post('/login',loginUser)

//register route
router.post('/register',registerUser)

//checking if email exists
router.post('/check-email', checkEmail);

module.exports=router