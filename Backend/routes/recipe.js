const express=require("express")
const { getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe } = require("../controller/recipe")
const router=express.Router()


// get all recipes
router.get("/",getRecipes)

// Get recipe by id 
router.get("/:id",getRecipe) 

// add recipe
router.post("/",addRecipe)

// Edit recipe
router.put("/:id",editRecipe)

// Delete recipe
router.delete("/:id",deleteRecipe)

module.exports=router