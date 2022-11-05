const jwt = require("jsonwebtoken")
const UserModel = require("../models/userModel")

const createToken = async function(req, res){
  let userName = req.body.emailId
  let password = req.body.password

  let user = await UserModel.findOne({emailId:userName, password: password})

  let token = jwt.sign(
    {
      userId: user._id.toString(),
    },
    "saurav-nashik"
  )
  res.setHeader("x-auth-token", token)
  res.send({status : true, data: token })
}

const tokenVerify = async function (req, res, next){
  let token = req.headers["x-auth-token"]

  if(!token) return res.send({status:false, msg:" token is missing"})

  // console.log(token)

  let decodeToken = jwt.verify(token, "saurav-nashik" )

  if(!decodeToken) {
  return res.send({status:false, msg: "token is invalid"})
  } else{
  next()
  }
}
module.exports.createToken = createToken
module.exports.tokenVerify =tokenVerify  





