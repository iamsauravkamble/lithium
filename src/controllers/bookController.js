const { updateMany } = require("../models/authorModel")
const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel = require("../models/publisherModel")


const createBook= async function (req, res) {
    let book = req.body
    let{author, publisher} = book
    if(!author){
        return res.send("author detail is required")
    }

    if(!publisher){
        return res.send("publisher detail is required")
    }

    let authorId = await authorModel.findById(book.author)
    if(!authorId) {
        return res.send("author is not present")
    }

    let publisherId = await publisherModel.findById(book.publisher)
    if(!publisherId){
        return res.send("publisher is not present")
    }
    let bookCreated = await bookModel.create(book)
    res.send({data: bookCreated})
}

const getBooksData= async function (req, res) {
    let books = await bookModel.find()
    res.send({data: books})
}

const getBooksWithAuthorAndPublisherDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate('author').populate('publisher')
    res.send({data: specificBook})

}

const updateKey = async function(req, res){
    let n = await publisherModel.find({name: {$in: ["Penguin","HarperCollins"]}})
    let update = await bookModel.updateMany({publisher:n}, {$set: {isHardCover:true}})
    res.send({msg:updateMany})
}

const updatePrice = async function(req, res){
    let r = await authorModel.find({rating: {$gt:3.5}})
    let update = await bookModel.updateMany({author:r}, {$inc: {price:10}} )
    res.send({msg:update})
}
module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.getBooksWithAuthorAndPublisherDetails = getBooksWithAuthorAndPublisherDetails
module.exports.updateKey = updateKey
module.exports.updatePrice = updatePrice
