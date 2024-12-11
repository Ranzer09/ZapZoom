const mongoose = require('mongoose')

const validator= require('validator')
const Schema = mongoose.Schema

const productSchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    category:{
        type:String,
        required:true,
    },
    qty:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    business:{
        type:String,
        required:true,
    }
},{timestamps:true})

module.exports=mongoose.model('Product',productSchema)
