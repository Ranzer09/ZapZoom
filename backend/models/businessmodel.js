const mongoose = require('mongoose')
const validator= require('validator')
const Schema = mongoose.Schema

const businessSchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    admin:{
        type:String,
        unique:true,
        require:true
    },
    date:{
        type:String,
        required:true,
    },
    products:{
        type: [String],
        required:true,
    },
    status:{
        type:Boolean,
        required:true,
    }
})


//static register
businessSchema.statics.register=async function (name,admin,date){
    //validation
    if(name)
        console.log(name,admin,date)

    if(!(name&&admin&&date))
    {
        throw Error("All fields must be filled")
    
    }
    
    //save data
    const exists=await this.findOne({name})
    if(exists)
    {
        throw Error("Business already exists")
    }

    const business = await this.create({name,admin,date,products:[],status:false})

    return business
}


module.exports=mongoose.model('Business',businessSchema)