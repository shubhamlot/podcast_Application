const { buildSchema } = require('graphql')

module.exports = buildSchema(`
type Channel {
    _id: ID
    creator:String!
    channelname:String!
    rssfeed:String!
}

input ChannelInput{
    creator:String!
    channelname:String!
    rssfeed:String!

}

type User{
    _id:ID
    firstname:String!
    lastname:String!
    email:String!
    password:String
}

input UserInput{
    firstname:String!
    lastname:String!
    email:String!
    password:String!
}

type RootQuery {
    channels: [Channel!]!
}

type RootMutation {
    createChannel(channelInput:ChannelInput): Channel
    createUser(userInput:UserInput):User
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)