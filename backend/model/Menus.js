const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const {Schema} = mongoose

const Menu = new Schema({
    menu_id:{
        type:Number
    },
    restaurent_id:{
        type:Number
    },
    food_name:{
        type:String
    },
    price:{
        type:String
    },
    category:{
        type:String
    }, 
    food_image:{
        type:String,
    },     
    ratings:{
        type:Number,
    }, 
    status:{
        type:String,
        enum:['Active','In-Active'],
        default:'Active'
    },
    created_on:{
        type:Date
    },
    updated_on:{
        type:Date
    }
})

Menu.plugin(AutoIncrement,{inc_field:'menu_id'});

module.exports = mongoose.model("menu",Menu)