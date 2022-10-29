const { count } = require("console")
const authorModel = require("../models/authorModel")
const bookModel2 = require("../models/bookModel2")
const BookModel= require("../models/bookModel")
const BookModel2 = require("../models/bookModel2")

const createBook2 = async function(req, res) {
    let data = req.body
    let book2 = await BookModel2.create(data)
    res.send({msg: book2})
}

const createAuthor = async function(req, res){
    let data = req.body
    let authors = await authorModel.create(data)
    res.send({msg: authors})
}

const booksList = async function(req, res) {
    let id = await authorModel.findOne({ author_name: "Chetan Bhagat" }).select({author_id:1})
    let list = await bookModel2.find({author_id: {$eq: id.author_id}})
    res.send({msg:list})
}

const updatePrice = async function(req, res){
    let book = await bookModel2.findOneAndUpdate({name: "Two states"}, {$set:{ price : 100 }}, {new : true} )
    let price = await bookModel2.findOne({name: "Two states"}).select({ author_id:1, price: 1, _id: 0})
    const authorName = await authorModel.findOne({author_id: {$eq: price.author_id}}).select({author_name:1})
    res.send( {msg:price, authorName})
}

const booksData = async function(req, res){
    let books = await bookModel2.find({price: {$gte:50, $lte:100}}).select({author_id:1})
    let id = books.map(x => x.author_id)
    let authorName = await authorModel.find({author_id:id}).select({author_name:1, _id:0})
    res.send({msg: authorName})
}
// const createBook= async function (req, res) {
//     let data= req.body

//     let savedData= await BookModel.create(data)
//     res.send({msg: savedData})
// }

// const getBooksData= async function (req, res) {
//     let allBooks= await BookModel.find( {authorName : "HO" } )
//     console.log(allBooks)
//     if (allBooks.length > 0 )  res.send({msg: allBooks, condition: true})
//     else res.send({msg: "No books found" , condition: false})
// }


// const updateBooks= async function (req, res) {
//     let data = req.body // {sales: "1200"}
//     // let allBooks= await BookModel.updateMany( 
//     //     { author: "SK"} , //condition
//     //     { $set: data } //update in data
//     //  )
//     let allBooks= await BookModel.findOneAndUpdate( 
//         { authorName: "ABC"} , //condition
//         { $set: data }, //update in data
//         { new: true , upsert: true} ,// new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
//      )
     
//      res.send( { msg: allBooks})
// }

// const deleteBooks= async function (req, res) {
//     // let data = req.body 
//     let allBooks= await BookModel.updateMany( 
//         { authorName: "FI"} , //condition
//         { $set: {isDeleted: true} }, //update in data
//         { new: true } ,
//      )
     
//      res.send( { msg: allBooks})
// }




// CRUD OPERATIONS:
// CREATE
// READ
// UPDATE
// DELETE



// // module.exports.createBook= createBook
// module.exports.getBooksData= getBooksData
// module.exports.updateBooks= updateBooks
// module.exports.deleteBooks= deleteBooks

module.exports.createBook2 = createBook2
module.exports.createAuthor = createAuthor
module.exports.booksList = booksList
module.exports.updatePrice = updatePrice
module.exports.booksData = booksData
