const mongoose = require('mongoose')
//const User = require('./user')
const Schema = mongoose.Schema

const ChannelSchema=new Schema({

    channelname:{
        type:String,
        required:true
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    rss:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model('Channel',ChannelSchema)