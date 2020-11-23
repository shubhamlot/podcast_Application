const User = require('../../models/user')
const Channel = require('../../models/channel')
const bcrypt = require('bcrypt')

module.exports = {
    users:()=>{
      return User.find().populate('subscription.channels')
      .then(users =>{
        return users.map(user => {
          return {
            ...user._doc,
            _id:user.id,
            password:null
          }
        })
      })
    },
    createUser:(arg)=>{

      return User.findOne({email:arg.userInput.email})
      .then(user=>{
       
        if (user){
          //console.log("throw")
          throw new Error('User Exists')
        }
        return bcrypt.hash(arg.userInput.password,12);
      })
     .then(hashedpassword=>{
            const user = new User({
              firstname:arg.userInput.firstname,
              lastname:arg.userInput.lastname,
              email:arg.userInput.email,
              password:hashedpassword,
              subscription:arg.userInput.subscription
            })
            return user.save()
          })
          .then(result=>{
          return { ...result._doc, _id:result.id, password:null }
      })
      .catch(err=>{
        console.log(err)
      })
      
    },

    channels:()=>{
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

    createChannel:(arg)=>{
      let createdchannel
      const channel = new Channel({
        channelname: arg.channelInput.channelname,
        author:"5fb92900a429812430c92ef8",
        rss: arg.channelInput.rss
      })
      //console.log(channel)
      return channel
      .save()
      .then(result=>{
        
        createdchannel = { ...result._doc, _id:result.id }
        //console.log(createChannel)
        return User.findById("5fb92900a429812430c92ef8")
        
      })
      .then(result=>{
          return createdchannel
      })
      .catch(err=>{
        throw new Error(err)
      })

    }
  }