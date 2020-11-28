const express = require('express')
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
const graphqlSchema = require('./graphQL/Schemas/index')
const graphqlResolver = require('./graphQL/Resolvers/index')
const mongoose = require('mongoose')
const isAuth = require('./middleware/is-auth')


const app = express()


app.use(bodyParser.json())
app.use(isAuth)

app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResolver,
  graphiql:false
}))


mongoose.connect('mongodb://localhost/Pod_dataset')
.then(
  app.listen(8080)
)
.catch(err=>{
  console.log(err)
})


 



 
