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
      
      let parser = new Parser()

       return Channel.findOne({_id:arg.id}).then(res=>{
        return res.rss
       }).then(async rss=>{
        return await parser.parseURL(rss)
       }).then(feed=>{
         let temp=[]

         feed.items.forEach(item=>{
          
          temp.push({
            title:item.title,
            url:item.link,
            discription:item.content,
            img:item.enclosure.url
          })
          
        })
        return temp
      }).then(data=>{
        return data
      })

      
    },

    createChannel: async (arg, req) => {
       //console.log(!req.isAuth)
     
      let createdchannel

      let parser = new Parser()
        // feed.channel.forEach(item=>{
        //   console.log(item.title)
        // })
      return await parser.parseURL(arg.channelInput.rss).then(async feed=>{

         const channel = new Channel({
        
        channelname: feed.title,
        author: arg.channelInput.author,
        rss: arg.channelInput.rss,
        channel_img:feed.image.url
      });
        channel.save();
         return channel
      }).then(data=>{
        console.log(data)
        return data
      })

      
    

      // try {
      //   const result = await channel.save();
      //   createdchannel = result;

      //   return createdchannel;
      // } catch (err) {
      //   console.log(err);
      //   throw err;
      // }

    }
  }