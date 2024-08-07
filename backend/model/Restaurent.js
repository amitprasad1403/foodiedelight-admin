const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const {Schema} = mongoose

const Restaurent = new Schema({
    restaurent_id:{
        type:Number
    },
    name:{
        type:String
    },
    short_desc:{
        type:String
    },
    phone_number:{
        type:String
    },
    address:{
        type:String
    },
    state:{
        type:String
    },
    city:{
        type:String,
    },
    image:{
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

Restaurent.plugin(AutoIncrement,{inc_field:'restaurent_id'});

module.exports = mongoose.model("restaurent",Restaurent)