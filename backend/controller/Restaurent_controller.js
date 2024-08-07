const Restaurent = require('../model/Restaurent')
const Menu = require('../model/Menus')

//Admin
const addRestaurent = async (req, res, next) => {
    try {
        console.log(req.body);
        console.log(req.file); 

        if (!req.file) {
            return res.status(400).json({ success: false, message: "File not found." });
        }

        const addRestaurent = await Restaurent.create({
            name: req.body.resto_name,
            short_desc: req.body.short_desc,
            phone_number: req.body.phone_number,
            image: req.file.filename,
            address: req.body.address,
            state: req.body.state,
            city: req.body.city,
            date: Date.now(),
            created_on: Date.now()
        });

        if (!addRestaurent) {
            return res.status(400).json({ success: false, message: "Failed to add restaurant details." });
        }

        return res.status(200).json({ success: true, message: "Restaurant details added.", data: addRestaurent });

    } catch (err) {
        console.log(err);
        return res.status(400).json({ err });
    }
}

const getAllRestaurents = async (req,res,next) => {
    try{
        const restaurentList = await Restaurent.find()

        if(!restaurentList){
            return res.status(400).json({success:false,message:"Failed to get restaurent list."})
        }

        // console.log(restaurentList)

        return res.status(200).json({success:true,message:"Restaurent list.",data:restaurentList})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}

const getRestaurentById = async (req,res,next) => {
    try{
        const restaurantDetails = await Restaurent.findOne({restaurent_id:req.params.id})

        if(!restaurantDetails){
            return res.status(400).json({success:false,message:"Failed to get restaurent data."})
        }

        // console.log(restaurantDetails)

        return res.status(200).json({success:true,message:"Restaurent data.",data:restaurantDetails})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}

const updateRestaurent = async (req, res, next) => {
    try {
        const restaurantData = await Restaurent.findOne({ restaurent_id: req.params.id });

        if (!restaurantData) {
            return res.status(400).json({ success: false, message: "Failed to update restaurant details" });
        } 

        if (req.body.resto_name){
            restaurantData.name = req.body.resto_name;
        } 
        if (req.body.short_desc){
            restaurantData.short_desc = req.body.short_desc;
        } 
        if (req.body.phone_number){
            restaurantData.phone_number = req.body.phone_number;
        } 
        if (req.body.address){
            restaurantData.address = req.body.address;
        } 
        if (req.body.state){
            restaurantData.state = req.body.state;
        } 
        if (req.body.city){
            restaurantData.city = req.body.city;
        } 
        if (req.body.ratings){
            restaurantData.ratings = req.body.ratings;
        } 
        if (req.body.status){
            restaurantData.status = req.body.status; 
        } 

        if (req.file) {
            restaurantData.image = req.file.filename;
        }

        restaurantData.updated_on = Date.now();

        await restaurantData.save();

        return res.status(200).json({ success: true, message: "Restaurant updated successfully." });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ err });
    }
};

const deleteRestaurent = async (req,res,next) => {
    try{
        const restaurantData = await Restaurent.findOne({restaurent_id:req.params.id})

        if(!restaurantData){
            return res.status(200).json({success:false,message:"Failed to delete restaurent."})
        }

        restaurantData.status = 'In-Active'

        await restaurantData.save()

        return res.status(200).json({success:true,message:"Restaurent deleted successfully"})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}

//User
const getAllActiveRestaurents = async (req,res,next) => {
    try{
        const restaurentList = await Restaurent.find({status:'Active'})

        if(!restaurentList){
            return res.status(400).json({success:false,message:"Failed to get restaurent list."})
        }

        // console.log(restaurentList)

        return res.status(200).json({success:true,message:"Restaurent list.",data:restaurentList})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}

const getRestaurentDetails = async (req,res,next) => {
    try{
        const restaurentDetails = await Restaurent.findOne({ restaurent_id: req.params.id });
        
        if (!restaurentDetails) {
            return res.status(400).json({ success: false, message: "Failed to fetch restaurent details" });
        }

        const menuDetails = await Menu.aggregate([
            {
                $match: {
                    restaurent_id: restaurentDetails.restaurent_id,
                    status: 'Active',
                }
            } 
        ]); 

        return res.status(200).json({ success: true, message: "Restaurent details.", restaurentDetails: restaurentDetails, menuDetails: menuDetails });
    }
    catch(err){
        console.log(err)
        return res.status(400).json({err})
    }
}

module.exports = {addRestaurent,getAllRestaurents,getRestaurentById,updateRestaurent,deleteRestaurent,getAllActiveRestaurents,getRestaurentDetails}