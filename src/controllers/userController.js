const userModel= require("../models/userModel")
const jwt = require("jsonwebtoken")




const basicCode= async function(req, res) {
    let tokenDataInHeaders= req.headers.token
    console.log(tokenDataInHeaders)

    console.log( "HEADER DATA ABOVE")
    console.log( "hey man, congrats you have reached the Handler")
    res.send({ msg: "This is coming from controller (handler)"})
    }



const createUser= async function (req, res) {
   try  {
    let data= req.body
    let savedData= await userModel.create(data)
    res.status(201).send(savedData)
} catch(error) {
    return res.status(500).send({message: error.message})
}
}

const loginUser = async function(req, res){
   try {
      let userName = req.body.emailId
    let password = req.body.password
  
    let user = await userModel.findOne({emailId:userName, password:password})
    if(!user){
      return res.status(401).send({
        status:false, msg:"username or password is not correct"
      })
    }
  
    let token = jwt.sign(
      {
        userId: user._id.toString()
      },
      "saurav"
    )
  
    res.setHeader("x-auth-token", token)
    res.status(201).send({status:true, data:token})
  } catch (error){
    return res.status(500).send({ message: error.message})
  } 
}
  

  const updateUser = async function(req, res){
    try {
      let userId = req.params.userId
    let user = await userModel.findById(userId)
  
    if(!user) return res.status(401).send({status:false, msg :"No such user exists"})
  
    let userData = req.body
    let updatedUser = await userModel.findOneAndUpdate({_id: userId}, userData, {new : true})
  
    res.status(204).send({status:true, data: updatedUser})
    } catch (error){
      return res.status(500).send({message: error.message})
    }
  
  }
  
  const postMessage = async function (req, res) {
    try {
      let message = req.body.message
  
    let user = await userModel.findById(req.params.userId)
    if(!user){
      return res.status(404).send({msg: "user is missing"})
    }
  
    let updatedPosts = user.posts
  
    updatedPosts.push(message)
  
    let updatedUser = await userModel.findOneAndUpdate({_id: user._id }, {posts : updatedPosts}, {new : true} )
  
    res.status(201).send({status : true, data : updateUser})
  } catch (error){
    return res.status(500).send({message: error.message})
  }
  }

const getUsersData= async function (req, res) {
    try {
        let userId = req.params.userId;
        let userDetails = await userModel.findById(userId);

        if(!userDetails) return res.send({status: false, msg: "No such user exists"})
        res.status(200).send({status: true, data: userDetails})
    } catch(error) {
        return res.status(500).send({message: error.message})
    }
};

module.exports.createUser= createUser
module.exports.loginUser= loginUser
module.exports.updateUser= updateUser
module.exports.postMessage= postMessage
module.exports.getUsersData= getUsersData
module.exports.basicCode= basicCode