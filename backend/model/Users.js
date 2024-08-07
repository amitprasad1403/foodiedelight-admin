const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const {Schema} = mongoose

const Users = new Schema({
    user_id:{
        type:Number
    },
    username:{
        type:String
    },
    password:{
        type:String
    },
    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    email:{
        type:String
    },
    phone_number:{
        type:String,
    },
    role:{
        type:String,
        enum:['Admin','SuperAdmin']
    },
    status:{
        type:String,
        enum:['Active','In-Active'],
        defasult:'Active'
    },
    created_on:{
        type:Date
    },
    updated_on:{
        type:Date
    }
})

Users.plugin(AutoIncrement,{inc_field:'user_id'});

module.exports = mongoose.model("users",Users)