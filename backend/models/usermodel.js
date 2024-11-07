const mongoose = require('mongoose')
const bcrypt=require('bcrypt')

const validator= require('validator')
const Schema = mongoose.Schema

const userschema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        required:true,
    }
})


//static register
userschema.statics.register=async function (email,username,password){
    //validation
    if(username)
        console.log(username,password,email)

    if(!(email&&password))
    {
        throw Error("All fields must be filled")
    }
    if(!validator.isEmail(email))
    {
        throw Error('Please provide valid Email')
    }
    if(!validator.isStrongPassword(password))
    {
        throw Error('Password not strong(Requires Uppercase, numeric and symbols)')
    }
    
    //save data
    const exists=await this.findOne({email})
    if(exists)
    {
        throw Error("Email is already in use")
    }
    
    //hashing password
    const salt=await bcrypt.genSalt(6)
    const hash =await bcrypt.hash(password,salt)

    const user = await this.create({email,username,password:hash})

    return user
}

//static login method
userschema.statics.login= async function (email,password) {
    //validation
    if(!(email&&password))
        {
            throw Error("All fields must be filled")
        }
    const user=await this.findOne({email})
    if(!user)
    {
        throw Error("User not found")
    }
    
    const match=await bcrypt.compare(password,user.password)
    if(!match)
    {
        throw Error('Either email or password is wrong')
    }

    return user
}


userschema.statics.checkemail = async function(email) {
    if (!email) {
      throw new Error("Email must be provided");
    }
  
    try {
      // Check if a user with the given email exists
      const user = await this.findOne({email:email.email});
      if(!user)
        return false
    return true
    } catch (error) {
      console.error('Error checking email:', error);
      throw new Error('Database query failed');
    }
  };

module.exports=mongoose.model('User',userschema)