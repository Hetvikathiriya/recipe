// import modules
const   User=require("../models/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

// define function
const userSignUp=async(req,res)=>{

        // check user input
        const {email,password}=req.body
        if(!email || !password)
        {
            return res.status(400).json({message:"Email and password is required"})
        }
        //  check email is already present or not
        let user = await UserActivation.findOne({email})
        if(user){
            return res.status(400).json({error:"Email is already exist"})
        }
        // hash password
        const hashPwd=await bcrypt.hash(password,10)
        // for create new user
        const newUser=await bcrypt.create({
            email,password:hashPwd
        })
        // create jwt token
        let token=jwt.sign({email,id:newUser._id},process.env.SECRET_KEY)
        return res.status(200).json({token,newUser})
}

const userLogin=async(req,res)=>{


}

const getUser=async(req,res)=>{


}

module.exports={userLogin,userSignUp,getUser}