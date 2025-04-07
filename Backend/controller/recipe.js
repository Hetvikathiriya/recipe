const Recipes=require("../models/recipe")
const multer  = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      const filename = Date.now() + '-' + file.fieldname
      cb(null, filename)
    }
  })
  
  const upload = multer({ storage: storage })

// get all recipes
const getRecipes=async(req,res)=>{
    const recipes=await Recipes.find()
    return res.json(recipes)
}

// get single recipe by id
const getRecipe=async(req,res)=>{
    const recipe=await Recipes.findById(req.params.id)
    res.json(recipe)
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

// edit recipe
const  editRecipe=async(req,res)=>{
    const {title, ingredients, instructions, time}=req.body //Extracting Data from Request

    // check recipe is already present or not
    let recipe=await Recipes.findById(req.params.id)

    // handle error
    try{
        if(recipe){
            await Recipes.findByIdAndUpdate(req.params.id,req.body,{new:true})
            res.json({title,ingredients,instructions,time})
        }
    }
    catch(err){
            return res.status(404).json({message:"error"})
    } 
}

// delete recipe
const  deleteRecipe=(req,res)=>{
    res.json({message:"hello"})
}
 

module.exports={getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe}