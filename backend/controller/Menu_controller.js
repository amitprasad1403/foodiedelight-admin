const Menu = require("../model/Menus")

//Admin
const addMenuFood = async (req, res, next) => {
    try {
        console.log(req.body);
        console.log(req.file); 

        if (!req.file) {
            return res.status(400).json({ success: false, message: "File not found." });
        }

        const addMenuFood = await Menu.create({
            restaurent_id: req.body.restaurent_id,
            food_name: req.body.food_name,
            price: req.body.price,
            category: req.body.category,
            food_image: req.file.filename,
            ratings: req.body.ratings,  
            created_on: Date.now()
        });

        if (!addMenuFood) {
            return res.status(400).json({ success: false, message: "Failed to add menu food details." });
        }

        return res.status(200).json({ success: true, message: "Menu food details added.", data: addMenuFood });

    } catch (err) {
        console.log(err);
        return res.status(400).json({ err });
    }
}

const getAllMenuFood = async (req,res,next) => {
    try{
        const menuList = await Menu.find({restaurent_id:req.params.id})

        if(!menuList){
            return res.status(400).json({success:false,message:"Failed to get menu list."})
        }

        // console.log(menuList)

        return res.status(200).json({success:true,message:"Menu list.",data:menuList})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}

const getMenuById = async (req,res,next) => {
    try{
        const menuDetails = await Menu.findOne({menu_id:req.params.id})

        if(!menuDetails){
            return res.status(400).json({success:false,message:"Failed to get menu data."})
        }

        // console.log(menuDetails)

        return res.status(200).json({success:true,message:"Menu data.",data:menuDetails})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}

const updateMenu = async (req, res, next) => {
    try {
        const menuData = await Menu.findOne({ menu_id: req.params.id });

        if (!menuData) {
            return res.status(400).json({ success: false, message: "Failed to update menu details" });
        } 

        if (req.body.food_name){
            menuData.food_name = req.body.food_name;
        } 
        if (req.body.price){
            menuData.price = req.body.price;
        } 
        if (req.body.category){
            menuData.category = req.body.category;
        } 
        if (req.body.ratings){
            menuData.ratings = req.body.ratings;
        } 
        if (req.body.status){
            menuData.status = req.body.status; 
        } 

        if (req.file) {
            menuData.food_image = req.file.filename;
        }

        menuData.updated_on = Date.now();

        await menuData.save();

        return res.status(200).json({ success: true, message: "Menu updated successfully." });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ err });
    }
};

const deleteMenu = async (req,res,next) => {
    try{
        const menuData = await Menu.findOne({menu_id:req.params.id})

        if(!menuData){
            return res.status(200).json({success:false,message:"Failed to delete menu."})
        }

        menuData.status = 'In-Active'

        await menuData.save()

        return res.status(200).json({success:true,message:"Menu deleted successfully"})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}

//User

const getTopMenu = async (req,res,next) => {
    try{
        const topMenuDetails = await Menu.find({ 
            ratings: { $gt: 3 }, 
            status:'Active'
        })
        .sort({ menu_id: -1 })
        .limit(6);

        if(!topMenuDetails){
            return res.status(400).json({success:false,message:"Failed to get top menu data."})
        }
        // console.log(topMenuDetails)

        return res.status(200).json({success:true,message:"Top Menu data.",data:topMenuDetails})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}

module.exports = {addMenuFood,getAllMenuFood,getMenuById,updateMenu,deleteMenu,getTopMenu}