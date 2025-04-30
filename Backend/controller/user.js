// import modules
// const User=require("../models/user")
// const bcrypt=require("bcrypt")
// const jwt=require("jsonwebtoken")

// // user signup
// const userSignUp=async(req,res)=>{

//         // check user input
//         const {email,password}=req.body
//         if(!email || !password)
//         {
//             return res.status(400).json({message:"Email and password is required"})
//         }
//         //  check email is already present or not
//         let user = await User.findOne({email})
//         if(user){
//             return res.status(400).json({error:"Email is already exist"})
//         }
//         // hash password
//         const hashPwd=await bcrypt.hash(password,10)
//         // for create new user
//         const newUser=await User.create({
//             email,password:hashPwd
//         }) 
//         // create jwt token
//         let token=jwt.sign({email,id:newUser._id},process.env.SECRET_KEY)
//         return res.status(200).json({token,user:newUser})
// }

// // user login
// const userLogin=async(req,res)=>{
//     const {email,password}=req.body
//      // check required field
//     if(!email || !password)
//     {
//         return res.status(400).json({message:"Email and password is required"})
//     }
//     // find user by email
//     let user=await User.findOne({email})
//     // user is exist already or not
//     if(user && await bcrypt.compare(password,user.password)){
//         let token=jwt.sign({email,id:user._id},process.env.SECRET_KEY)
//         return res.status(200).json({token,user})
//     }
//     else{
//         return res.status(400).json({error:"invalid credientials"})
//     }

// }

// // get user
// const getUser=async(req,res)=>{
//     const user=await User.findById(req.params.id)
//     res.json({email:user.email})
// }

// module.exports={userLogin,userSignUp,getUser}
// const userSignUp = async (req, res) => {
//     const { name, email, password } = req.body;
  
//     if (!name || !email || !password) {
//       return res.status(400).json({ error: "Name, Email and Password are required" });
//     }
  
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: "Email already exists" });
//     }
  
//     const hashPwd = await bcrypt.hash(password, 10);
  
//     const newUser = await User.create({
//       name,
//       email,
//       password: hashPwd,
//     });
  
//     const token = jwt.sign({ email, id: newUser._id }, process.env.SECRET_KEY);
//     return res.status(200).json({ token, user: newUser });
//   };

const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Sign Up
exports.userSignUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: "Server error during sign up" });
  }
};

// Login
exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: "Server error during login" });
  }
};

// Get user by ID
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user)
      return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
