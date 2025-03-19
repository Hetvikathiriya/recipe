// import mongoose
const mongoose=require("mongoose")

// create schema
const recipeSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    ingredients:{
        type:String,
        required:true
    },
     instructions:{
        type:String,
        required:true
    },
     time:{
        type:String,
        
    },
     coverImage:{
        type:String,
    },
    
},{timestamps:true})

// define model
module.exports=mongoose.model("Recipes",recipeSchema)