const express=require("express")
const router=express.Router()

// get all rtecipes
router.get("/",(req,res)=>{
    res.json({message:"hello"})
})

module.exports=router