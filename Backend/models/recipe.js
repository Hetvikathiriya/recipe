// // import mongoose
// const mongoose=require("mongoose")

// // create schema
// const recipeSchema=mongoose.Schema({
//     title:{
//         type:String,
//         required:true
//     },
//     ingredients:{
//         type:Array,
//         required:true
//     },
//      instructions:{
//         type:String,
//         required:true
//     },
    
//      time:{
//         type:String,
        
//     },
//     coverImage:{
//         type:String,
//     },
//     createdBy:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"User"
//     }
    
// },{timestamps:true})

// // define model
// module.exports=mongoose.model("Recipes",recipeSchema)

// import mongoose
const mongoose = require("mongoose");

// create schema
const recipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    time: {
        type: String,
    },
    coverImage: {
        type: String,
    },
    // category: {
    //     type: String,
    //     enum: ['Breakfast', 'Salad', 'Dinner', 'Desert', 'Drinks', 'Soup'],
    //     required: true
    // },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true });

module.exports = mongoose.model("Recipe", recipeSchema);
