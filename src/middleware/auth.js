const jwt = require("jsonwebtoken")

const authenticate = function(req, res, next) {
    let token = req.headers["x-auth-token"]
    if(!token){
        return res.send({status:false, msg: "token must be present in the request header"})
    } 

    let decodeToken = jwt.verify(token, "saurav")
    if(!decodeToken) {
        return res.send({status:false, msg:"token is not valid"})
    } 

    req.userLoggedIn = decodeToken.userId
    //check the token in request header
    //validate this token

    next()
}


const authorise = function(req, res, next) {
    let userToBeModified = req.params.userId
    if(userToBeModified !== req.userLoggedIn) return res.send({status:false, msg: "user logged is not allowed to modify the requested users data"})

    // comapre the logged in user's id and the id in request
    next()
}

module.exports.authenticate = authenticate
module.exports.authorise = authorise
