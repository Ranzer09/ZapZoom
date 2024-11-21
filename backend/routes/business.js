const express = require('express')
const router = express.Router()

//controllers
const {
    registerBusiness,
    getAll,
    deletion
}= require('../controller/businessController')
//register route
router.post('/register',registerBusiness)
router.get('/',getAll)
router.delete('/:id',deletion)
module.exports=router