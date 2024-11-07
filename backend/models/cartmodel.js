const mongoose = require('mongoose')

const validator= require('validator')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
    name:{type:String,required:true,},
    qty: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true }
});

const CartSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        ref:'User'
    },
    cart:[ProductSchema],
    total_qty:{
        type:Number,
        default:0,
    },
    total_price:{
        type:Number,
        default:0,
    }
},{timestamps:true})

module.exports=mongoose.model('Cart',CartSchema)
