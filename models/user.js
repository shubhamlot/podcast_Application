const mongoose = require('mongoose')
const Schema =  mongoose.Schema

const userSchema = new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
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
    subscibed:[
        {
        type:Schema.Types.ObjectId,
        ref:'channel'
        }
    ]
    
})

module.exports = mongoose.model('User',userSchema)