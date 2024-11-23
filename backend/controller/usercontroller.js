const User = require('../models/usermodel')
const jwt=require('jsonwebtoken')

const createToken=(_id)=>{
    return jwt.sign({_id},process.env.SECRET, {expiresIn:'3d'})//creating token
}

//login user
const loginUser=async (req,res)=>{
 
    const{email,password}=req.body
    try {
        const user= await User.login(email,password)

    //create token
        const token=createToken(user._id)
        res.status(200).json({email,token})

    } catch (error) {
      console.log(error)
     res.status(400).json({error:error.message})   
    }
}

//signup user 
const registerUser=async (req,res)=>{
    const {email,username,password} = req.body
    try {
        //register the user
        const user= await User.register(email,username,password)
        
        //create token
        const token=createToken(user._id)
        res.status(200).json({email,token})
    } catch (error) {
    console.log(error)
     res.status(400).json({error:error.message})   
    }
}

//check for email
const checkEmail= async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.checkemail({ email });
    res.json({ isRegistered: !!user });//convert the object to boolean
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAll =async (req,res) => {
  try {
      const user =  await User.find({},'username _id email').sort({createdAt:-1})//user with descending order
      res.status(200).json({user})
  } catch (error) {
  res.status(400).json({error:error.message})        
  }
  }
 
module.exports={loginUser,registerUser,checkEmail,getAll} 