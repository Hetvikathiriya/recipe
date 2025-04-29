const Recipes=require("../models/recipe")
const multer  = require('multer')

// add multer middleware
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './public/images')
//     },
//     filename: function (req, file, cb) {
//       const filename = Date.now() + '-' + file.originalname
//       cb(null, filename)
//     }
//   })
  
const storage = multer.diskStorage({
  destination: "./public/images",      // Save files in the 'uploads' folder
  filename: (req, file, cb) => {
      return cb(null, `${Date.now()}${file.originalname}`)

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
const addRecipe = async (req, res) => {
  try {
    console.log("User:", req.user); // अब सही value दिखेगी

    const { title, ingredients, instructions, time } = req.body;

    if (!title || !ingredients || !instructions) {
      return res.status(400).json({ message: "Required fields can't be empty" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Cover image is required" });
    }

    const newRecipe = await Recipes.create({
      title,
      ingredients,
      instructions,
      time,
      coverImage: req.file.filename,
      createdBy:req.user.id
    });

    return res.status(201).json(newRecipe);
  } catch (error) {
    console.error("Error in addRecipe:", error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};


     

// edit recipe
const  editRecipe=async(req,res)=>{
    const {title, ingredients, instructions, time}=req.body //Extracting Data from Request

    // check recipe is already present or not
    let recipe=await Recipes.findById(req.params.id)

    // handle error
    try{
        if(recipe){
            let coverImage=req.file?.filename ? req.file?.filename : recipe.coverImage
            await Recipes.findByIdAndUpdate(req.params.id,{...req.body,coverImage },{new:true})
            res.json({title,ingredients,instructions,time})
        }
    }
    catch(err){
            return res.status(404).json({message:"error"})
    } 
}

// delete recipe
const  deleteRecipe=async(req,res)=>{
        try {
              await Recipes.deleteOne({_id:req.params.id})
              res.json({status:"OK"})
        } catch (err) {
            return res.status(400).json({message:"error"})
        }
}
 

module.exports={getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,upload}