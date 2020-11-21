const express = require('express')
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const mongoose = require('mongoose')
const User = require('./models/user')
const bcrypt = require('bcrypt')
const Channel = require('./models/channel')

const app = express()

app.use(bodyParser.json())



app.use('/graphql', graphqlHTTP({
  schema:buildSchema(`

      type User{
        _id:ID
        firstname:String!
        lastname:String!
        email:String!
        password:String
        mychannels:[String!]
        subscription:[String!]
      }

      input UserInput{
        firstname:String!
        lastname:String!
        password:String
        mychannels:[String!]
        email:String!
       
      }

      type Channel{
        _id:ID
        channelname:String!
        author: String!
        rss:String!
      }

      input ChannelInput{
        channelname:String!
        author:String!
        rss:String!
      }

      type RootQuery{

        users:[User!]!
        channels:[Channel!]

      }
      type RootMutation{

        createUser(userInput:UserInput):User
        createChannel(channelInput:ChannelInput):Channel

      }
      schema{
        query: RootQuery
        mutation: RootMutation
      }
  `),
  rootValue:{
    users:()=>{
      return User.find().populate('mychannels.mychannel').populate('subscription.channels')
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
      return Channel.find().populate('author')
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
      .then(user=>{
        if(!user){
          throw new Error('user not found')
        }
        user.mychannels.push(channel)
        user.save()
      })
      .then(result=>{
          return createdchannel
      })
      .catch(err=>{
        throw new Error(err)
      })

    }
  },
  graphiql:true
}))


mongoose.connect('mongodb://localhost/Pod_dataset')
.then(
  app.listen(8080)
)
.catch(err=>{
  console.log(err)
})


 



 
