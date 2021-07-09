const user = require('../../models/user')
const Channel = require('../../models/channel')
const { argsToArgsConfig } = require('graphql/type/definition')
const Parser = require('rss-parser')



module.exports = {

    channels:(req)=>{
      // if(!req.isAuth){
      //   throw new Error("unauthenticated")
      // }

      return Channel.find()
      .then(channels =>{
        return channels.map(channel => {

          return {
            ...channel._doc,
            _id:channel.id,
            // author: channel.bind(this, user._id),//
          }
        })
      })
    },

    getEpisode:async(arg,req)=>{
      // console.log(arg.rss)
      // let parser = new Parser()
      // let feed = await parser.parseURL("http://localhost:4000/RSS/dfghj567.rss");
      console.log("feed")
      return {
        url:"someurl",
        title:"title",
        discription:"dis"
      }
    },

    createChannel: async (arg, req) => {
       //console.log(!req.isAuth)
      if (req.isAuth) {
        throw new Error('Unauthenticated!');
      }
      let createdchannel

      
        // feed.channel.forEach(item=>{
        //   console.log(item.title)
        // })
      let feed = await parser.parseURL(arg.channelInput.rss);

      
      const channel = new Channel({
        
        channelname: feed.title,
        author: arg.channelInput.author,
        rss: arg.channelInput.rss,
        channel_img:feed.image.url,
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