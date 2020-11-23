
const { buildSchema } = require('graphql')

module.exports = buildSchema(`

      type User{
        _id:ID
        firstname:String!
        lastname:String!
        email:String!
        password:String
        subscription:[String!]
      }

      input UserInput{
        firstname:String!
        lastname:String!
        password:String
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
  `)