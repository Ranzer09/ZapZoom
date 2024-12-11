const express = require('express')
const router = express.Router()

//controllers
const {loginUser,registerUser, checkEmail,getAll,registerBusiness}= require('../controller/usercontroller')

//login route
router.post('/login',loginUser)

//register route
router.post('/register',registerUser)

//register business
router.patch('/register/:email',registerBusiness)

//get all users info
router.get('/',getAll)

//checking if email exists
router.post('/check-email', checkEmail);

module.exports=router