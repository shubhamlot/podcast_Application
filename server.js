const express = require('express')
const bodyparser = require('body-Parser')
const { graphqlHTTP } = require('express-graphql') 

const mongoose = require('mongoose')
const graphQlschema = require('./graphql/Schema/index')
const graphQlresolvers = require('./graphql/resolvers/index')
const { graphql } = require('graphql')

const app = express()

app.use(bodyparser.json())

app.use('/graphql', graphqlHTTP({
    
    schema: graphQlschema,
    rootValue: graphQlresolvers,
    graphiql:true,
}));

const url = 'mongodb://localhost/PodcastApp'

mongoose.connect(url, {useNewUrlParser:true})
.then(()=>{
    app.listen(8000)
    console.log("conected...")
}).catch(err =>{
    console.log(err)
})