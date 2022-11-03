

const userMiddleware = function(req, res, next){
    let isFreeAppUser = req.headers.isfreeappuser
    if(!isFreeAppUser){
        res.send("isFreeAppUser is missing in headers")
    } else {
        next()
    }
}


const orderMiddleware = function(req, res, next) {
    let isFreeAppUser = req.headers.isfreeappuser
    if(!isFreeAppUser) {
        res.send("isFreeAppUser is missing in headers")
    } else {
        isFreeAppUser = isFreeAppUser === 'true' ? true : false
    }
    next()
}

module.exports.userMiddleware = userMiddleware
module.exports.orderMiddleware = orderMiddleware

