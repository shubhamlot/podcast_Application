const User = require('../../models/user')
const Channel = require('../../models/channel')




module.exports = {

    channels:(req)=>{
      if(!req.isAuth){
        throw new Error("unauthenticated")
      }

      return Channel.find()
      .then(channels =>{
        return channels.map(channel => {
          return {
            ...channel._doc,
            _id:channel.id
          }
        })
      })
    },

    createChannel:async (arg, req)=>{
      //console.log(req.isAuth)
      if(!req.isAuth){
        throw new Error("unauthenticated")
      }

      let createdchannel
      const channel = new Channel({
        channelname: arg.channelInput.channelname,
        author: req.userId,
        rss: arg.channelInput.rss
      })
      //console.log(channel)
      return await channel
      .save()
      .then(result=>{
        
        createdchannel = { ...result._doc, _id:result.id }
        
        
      })
      .then(result=>{
          return createdchannel
      })
      .catch(err=>{
        throw new Error(err)
      })

    }
  }