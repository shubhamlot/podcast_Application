const mongoose = require('mongoose')

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
    },
        channel_type:{
            type:String,
            required:true
        },
        channel_img:{
            type:String,
        },
        discription:{
            type:String,
        }
        // followers:{
        //     type:Number,
        //     //required:true
        // },
        // registration_date:{
        //     type:Date,
        //     //require:true
        // }
    

})

module.exports = mongoose.model('Channel',ChannelSchema)