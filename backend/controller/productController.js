const mongoose = require('mongoose')
const Product=require('../models/productmodel')

//get all product
const readall =async (req,res) => {
try {
    const product =  await Product.find({}).sort({createdAt:-1})//product with descending order
    res.status(200).json(product)
} catch (error) {
res.status(400).json({error:error.message})        
}
}

//get a product
const readone =async (req,res) => {
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id))//check for id validity
        return res.status(404).json({error:'No such product'})

    const product =  await Product.findById({_id:id})
    if(!product)//check if product exists
        return res.status(404).json({error:'No such product'})
    res.status(200).json(product)

}


//create new product
const creation=async (req,res) => {
    const {name,qty,description,price,category}=req.body//destructure
    let EmptyFields=[]
    if(!name){
        EmptyFields.push('name')
    }
    if(!qty){
        EmptyFields.push('qty')
    }
    if(!description){
        EmptyFields.push('description')
    }
    if(!category){
        EmptyFields.push('category')
    }
    if(!price){
        EmptyFields.push('price')
    }
    if(price<1)
        return res.status(400).json({error:'Price is below 1!'})
    if(EmptyFields.length>0)
        return res.status(400).json({error:'One or more fields are left empty!',EmptyFields})

try {
    const product =  await Product.create({name,qty,description,price,category})//create it 
    res.status(200).json(product)//response
} catch (error) {
res.status(400).json({error:error.message})        
}
}

//update a product
const updation=async (req,res) => {
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id))//check id validity
        return res.status(404).json({error:'No such product'})
        console.log(req.body)

    const product =  await Product.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!product)//check if product exists
        return res.status(404).json({error:'No such product'})
    res.status(200).json(product)
}



//delete a product
const deletion=async (req,res) => {
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({error:'No such product'})

    const product =  await Product.findOneAndDelete({_id:id})
    if(!product)//check if product exists
        return res.status(404).json({error:'No such product'})
    res.status(200).json(product)
}



module.exports={
    creation,
    deletion,
    updation,
    readall,
    readone
}