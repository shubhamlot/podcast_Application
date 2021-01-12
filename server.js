const express = require('express')
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
const graphqlSchema = require('./graphQL/Schemas/index')
const graphqlResolver = require('./graphQL/Resolvers/index')
const mongoose = require('mongoose')
const isAuth = require('./middleware/is-auth')


const app = express()


app.use(bodyParser.json())

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
  if(req.method == "OPTIONS"){
    return res.sendStatus(200)
  }
  next()
})

app.use(isAuth)

app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResolver,
  graphiql:true
}))


mongoose.connect('mongodb://localhost/Pod_dataset')
.then(
  app.listen(8080)
)
.catch(err=>{
  console.log(err)
})


 



 
