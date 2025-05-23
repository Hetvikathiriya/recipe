// //  import express
// const express=require("express")
// const router=express.Router()
// const {userLogin,userSignUp,getUser}=require("../controller/user")

// // define routes
// router.post("/signUp",userSignUp)   
// router.post("/login",userLogin)
// router.get("/user/:id",getUser) 

// module.exports=router

const express = require("express");
const router = express.Router();
const {
  userLogin,
  userSignUp,
  getUser
} = require("../controller/user");

// Routes
router.post("/signUp", userSignUp);
router.post("/login", userLogin);
router.get("/user/:id", getUser);

module.exports = router;