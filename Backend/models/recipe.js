// import mongoose
const mongoose=require("mongoose")

// create schema
const recipeSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    ingredients:{
        type:Array,
        required:true
    },
     instructions:{
        type:String,
        required:true
    },
    
     time:{
        type:String,   
    },
    // category: {
    //     type: String,
    //     enum: ["Breakfast", "Lunch", "Dinner", "Drinks", "Soup", "Salad"],
    //     required: true,
    //   },
      
    coverImage:{
        type:String,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
    
},{timestamps:true})

// define model
module.exports=mongoose.model("Recipes",recipeSchema)
const Recipes = mongoose.model("Recipe", recipeSchema);

 