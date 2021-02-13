
const { buildSchema } = require('graphql')

module.exports = buildSchema(`

      type User{
        _id:ID
        username:String!
        email:String!
        password:String
        subscription:[String!]
      }

      input UserInput{
        username:String!
        password:String
        email:String!
       
      }

      type Channel{
        _id:ID
        channelname:String!
        author: String!
        rss:String!
        channel_type:String!
      }

      input ChannelInput{
        channelname:String!
        author: String!
        rss:String!
        channel_type:String!
        
      }


      type AuthData{
        userId: ID!,
        username: String!,
        token: String!,
        tokenExpiration: Int!
      }

      type RootQuery{

        login(email:String!, password:String!):AuthData!
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