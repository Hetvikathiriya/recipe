const express=require("express")
const { getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,upload } = require("../controller/recipe")
const verifyToken = require("../middleware/auth")
const router=express.Router()


// get all recipes
router.get("/",getRecipes)

// Get recipe by id 
router.get("/:id",getRecipe) 

// add recipe
router.post("/",upload.single('file'),verifyToken,addRecipe)

// Edit recipe
router.put("/:id",upload.single('file'),editRecipe)

// Delete recipe
router.delete("/:id",deleteRecipe)

module.exports=router