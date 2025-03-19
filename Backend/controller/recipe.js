const Recipes=require("../models/recipe")

const getRecipes=(req,res)=>{
    res.json({message:"hello"})
}

const getRecipe=  (req,res)=>{
    res.json({message:"hello"})
}

// add recipe 
const addRecipe=async (req,res)=>{
     const {title, ingredients, instructions, time}=req.body //Extracting Data from Request


    //  check condition of required field
     if(!title || !ingredients || !instructions)
     {
        res.json({message: "Required fields can't be emplty"})
     }

    //  store recipe in database
     const newRecipe=await Recipes.create({
        title, ingredients, instructions, time
    })

    // return response
    return res.json(newRecipe)
}

const  editRecipe=(req,res)=>{
    res.json({message:"hello"})
}

const  deleteRecipe=(req,res)=>{
    res.json({message:"hello"})
}
 

module.exports={getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe}