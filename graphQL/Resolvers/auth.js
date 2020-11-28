const User = require('../../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


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


    login: async({email, password}) => {
      const user = await User.findOne({ email:email })
      //console.log(user)
      if(!user){
        throw new Error('User Does Not Existes')
      }
      const isEqual = await bcrypt.compare(password,user.password)
      //console.log(isEqual)
      if(!isEqual){
        throw new Error('User Does Not Existes')
      }

      const token = jwt.sign({ userID : user.id, email: user.email }, 'secretkey!@#', {
        expiresIn: '1h'
      })
      //console.log(token)
      return { userId : user.id , token: token , tokenExpiration : 1 }

    }
}