const User = require('../../models/user')
const Channel = require('../../models/channel')
const { argsToArgsConfig } = require('graphql/type/definition')




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

    createChannel: async (arg, req) => {
      
      // if (!req.isAuth) {
      //   throw new Error('Unauthenticated!');
      // }
      let createdchannel
      const channel = new Channel({
        channelname: arg.channelInput.channelname,
        author: req.userId,
        rss: arg.channelInput.rss,
        // channel_details:{
        channel_type:arg.channelInput.channel_type,
        //   followers:0,
        //   registration_date:"2020-12-30T11:33:52.354Z"
        // }
      });
      
      try {
        const result = await channel.save();
        createdchannel = result;
  
        return createdchannel;
      } catch (err) {
        console.log(err);
        throw err;
      }

    }
  }