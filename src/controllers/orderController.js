const OrderModel = require("../models/orderModel")
const ProductModel = require("../models/productModel")
const UserModel= require("../models/userModel")
const moment = require('moment')

const createOrder =  async function(req, res) {
    let data = req.body
    let userId = data.userId
    let productId = data.productId

    let checkUser = await UserModel.findById(userId)
    let checkProduct = await ProductModel.findById(productId)

    if(!userId) {
        return res.send({msg: " user id is a mandatory field"})
    }

     if (!productId) {
        return res.send({msg: " product id is a mandatory field"})
    }

    if(!checkUser){
        return res.send({msg: " userId is not found in your Usercollection"})
    }
    if(!checkProduct) {
        return res.send({msg: " productId is not found in your Productcollection"})
    }

    let isFreeAppUser = req.headers.isfreeappuser  

    if(isFreeAppUser === "false") {
        let user = await UserModel.findById(userId)
        let userBalance = user.balance
        
        let product = await ProductModel.findById(productId)
        let productPrice = product.price

        if(userBalance >= productPrice){
            let newBalance = userBalance - productPrice;
            await UserModel.findOneAndUpdate( {_id:userId}, {$set: {balance : newBalance}})

            let today = moment().format("DD-MM-YYYY")
            data.amount = productPrice
            data.date = today
            let savedData = await OrderModel.create(data)
            res.send({ordered: savedData})
        } else {
            return res.send({msg: " user doesn't have enough balance" })
        }

    } else if(isFreeAppUser === 'true'){
            let today = moment().format("DD-MM-YYYY")
            data.amount = 0
            data.isFreeAppUser = true
            data.date = today
            let savedData = await OrderModel.create(data)
            res.send({ordered:savedData})
        }

      
     
}
const getAllOrders = async function(req, res) {
    let allOrders = await OrderModel.find().populate("userId").populate("productId")
    res.send({msg: allOrders})
}

module.exports.createOrder = createOrder
module.exports.getAllOrders = getAllOrders  