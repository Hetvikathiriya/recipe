// import modules
const User=require("../models/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

// user signup
const userSignUp=async(req,res)=>{

        // check user input
        const {email,password}=req.body
        if(!email || !password)
        {
            return res.status(400).json({message:"Email and password is required"})
        }
        //  check email is already present or not
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({error:"Email is already exist"})
        }
        // hash password
        const hashPwd=await bcrypt.hash(password,10)
        // for create new user
        const newUser=await User.create({
            email,password:hashPwd
        }) 
        // create jwt token
        let token=jwt.sign({email,id:newUser._id},process.env.SECRET_KEY)
        return res.status(200).json({token,newUser})
}

// user login
const userLogin=async(req,res)=>{
    const {email,password}=req.body
     // check required field
    if(!email || !password)
    {
        return res.status(400).json({message:"Email and password is required"})
    }
    // find user by email
    let user=await User.findOne({email})
    // user is exist already or not
    if(user && await bcrypt.compare(password,user.password)){
        let token=jwt.sign({email,id:user._id},process.env.SECRET_KEY)
        return res.status(200).json({token,user})
    }
    else{
        return res.status(400).json({error:"invalid credientials"})
    }

}

// get user
const getUser=async(req,res)=>{
    const user=await User.findById(req.params.id)
    res.json({email:user.email})
}

module.exports={userLogin,userSignUp,getUser}