const express = require('express')
const router = express.Router()

//controllers
const {
    registerBusiness,
    getAll,
    deletion,
    verfiy
}= require('../controller/businessController')
//register route
router.post('/register',registerBusiness)
router.get('/',getAll)
router.patch('/:id',verfiy)
router.delete('/:id',deletion)
module.exports=router