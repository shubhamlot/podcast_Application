const mongoose = require('mongoose')

const Schema = mongoose.Schema
//const Channel = require('./channel')

const UserSchema = new Schema({

    username:{
        type:String,
        required:true
    },
    
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    subscription:[
        {
            type:Schema.Types.ObjectId,
            ref: 'Channel'
        }
    ]


})

module.exports = mongoose.model('User',UserSchema)