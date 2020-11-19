
const Channel = require("../../models/channel")
const User = require("../../models/user")
const bcrypt =require("bcryptjs")

module.exports = {
     channels: ()=>{
    return Channel.find().then(
         channels=>{
             return channels.map(channel => {
                 return {...channel._doc, _id: channel.id}
             })
         }
     ).catch(err =>{
         console.log(err)
     })
 },
    
    createChannel: (args)=>{

        const channel = new Channel({
            creator:"5fb620fca0348a26d0eb3e92",
            channelname:args.channelInput.channelname,
            rssfeed:args.channelInput.rssfeed
        })

        return channel.save().
        then(result=>{
            return {...result._doc}
        }).catch(err=>{
            throw err
        })

 },


    createUser:(args)=>{
       return User.findOne({ email:args.userInput.email }).then(user =>{
            
            if(user){
                throw new Error("User already exists")
            }
            return bcrypt.hash(args.userInput.password,12)
            }).then(
            hashedpassword => {
                const user = new User({
                    firstname: args.userInput.firstname,
                    lastname: args.userInput.lastname,
                    email: args.userInput.email,
                    password: hashedpassword
                })
                return user.save()
            }).then(result =>{
                return { ...result._doc, password:null ,_id: result.id }
            }).catch(err =>{
            throw err
        })
       
    }
}
