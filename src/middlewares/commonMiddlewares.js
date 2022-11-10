const jwt = require("jsonwebtoken")

const authenticate = function(req, res, next) {
    try {
        let token = req.headers["x-auth-token"]
    if(!token){
        return res.status(404).send({status:false, msg: "token must be present in the request header"})
    } 

    let decodeToken = jwt.verify(token, "saurav")
    if(!decodeToken) {
        return res.status(401).send({status:false, msg:"token is not valid"})
    } 

    req.userLoggedIn = decodeToken.userId
    

    next()
    } catch(error){
        res.status(500).send({ msg: "Access Denied" })
    }
}


const authorise = function(req, res, next) {
    try {
        let userToBeModified = req.params.userId
    if(userToBeModified !== req.userLoggedIn) return res.send({status:false, msg: "user logged is not allowed to modify the requested users data"})
    next()
 } catch(error){
    res.status(500).send({ msg: "Access Denied" })
    }
}

module.exports.authenticate = authenticate
module.exports.authorise = authorise