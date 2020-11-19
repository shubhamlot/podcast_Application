const mongoose = require('mongoose')
const Schema = mongoose.Schema

const channelSchema = new Schema({

    creator:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    channelname:{
        type:String,
        required:true
    },
    rssfeed:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model('Channel',channelSchema)