const express=require("express")
const { getRecipes } = require("../controller/recipe")
const router=express.Router()


// get all recipes
router.get("/",getRecipes)

module.exports=router