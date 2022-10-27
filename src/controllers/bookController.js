const { count } = require("console")
const BookModel= require("../models/bookModel")

const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}

const bookList = async function(req, res){
    let author = await BookModel.find().select({ bookName:1, authorName:1, _id: 0,})
    res.send({msg : author})
}

const getBooksInYear = async function(req, res){
    let year = req.body
    let savedData = await BookModel.find(year)
    res.send({msg:savedData})
}

const getParticularBooks = async function(req, res){
    let particular = req.body
    let savedData = await BookModel.find(particular)
    res.send({msg:savedData})
}

const getXINRBooks = async function(req, res) {
    let XINR = await BookModel.find( { prices : { $in: ["INR 100", "INR 500"] } })
    res.send({msg:XINR})
}

const getRandomBooks = async function(req, res) {
    let random = await BookModel.find( { $or : [ {stockAvailable:true}, {totalPages: 250}] })
    res.send(random)
}
// const getBooksData= async function (req, res) {

    // let allBooks= await BookModel.find( ).count() // COUNT

    // let allBooks= await BookModel.find( { authorName : "AA" , isPublished: true  } ) // AND
    
    // let allBooks= await BookModel.find( { 
    //     $or: [ {authorName : "CC" } , { stockAvailable: true } , {  "year": 2022 }]
    // } )
    // .select( { bookName: 1, authorName: 1, _id: 0}) // SELECT keys that we want

    // let allBooks= await BookModel.find().sort( { year: 1 }) // SORT

    // PAGINATION 
    // let page= req.query.page
    // let allBooks= await BookModel.find().skip(3 * (page-1)).limit(3)

    // let allBooks= await BookModel.find().sort({ sales: -1 }).skip(3 * (page-1)).limit(3).select({ bookName: 1, authorName: 1, _id: 0} )


    // let allBooks= await BookModel.find({ year: { $eq:  2020 }  }) 
    // let allBooks= await BookModel.find({ year: { $ne:  137 }  }) 
    // let allBooks= await BookModel.find({ year: { $gt:  2021 }  }) 
    // let allBooks= await BookModel.find({ year: { $lt:  50 }  }) 
    // let allBooks= await BookModel.find({ year: { $lte:  50 }  }) 
    // let allBooks= await BookModel.find({ year: { $gte:  50 }  }) 
    
    // let allBooks= await BookModel.find({     year : { $in: [2020, 2017] }     }).count() 
    // sales : { $in: [10, 17, 82] }
    
    // let allBooks= await BookModel.find({     year : { $nin: [2020, 2017]}     }).select({ year: 1, _id:0})
    
    //  let allBooks= await BookModel.find({     $and: [{sales : {$gt: 20}} , [sales:  {$lt: 100}]]    })  //sales is between 20 and 100.... sales > 20 AND sales <100
    //  let allBooks= await BookModel.find({     sales : {$gt: 20, $lt: 100}   })  //sales is between 20 and 100.... sales > 20 AND sales <100


    //  let allBooks= await BookModel.findById("635a095a95150129713478e8") 
    //  let allBooks= await BookModel.findOne( {year: 2022}) 
    //  let allBooks= await BookModel.find( {year: 2020}) 
    
    

    //  update (not covered: - findByIdAndUpdate | updateOne )
    // let allBooks= await BookModel.update(   
    //     {  year: {$gt: 2021}  }, //condition
    //     { $set: { stockAvailable: true} } // the change that you want to make
    //     ) 



    // REGEX
    // let allBooks= await BookModel.find( { bookName:  /^Int/  }) 
    // let allBooks= await BookModel.find( { bookName:  /^INT/i  }) 
    // let allBooks= await BookModel.find( { bookName:  /5$/  }) 
    // let allBooks= await BookModel.find( { bookName:  /.*Programming.*/i  }) 
    
    // ASYNC AWAIT
    
    // let a= 2+4
    // a= a + 10
    // console.log(a)
    // let allBooks= await BookModel.find( )  //normally this is an asynchronous call..but await makes it synchronous


    // // WHEN AWAIT IS USED: - database + axios
    // //  AWAIT can not be used inside forEach , map and many of the array functions..BE CAREFUL
    // console.log(allBooks)
    // let b = 14
    // b= b+ 10
    // console.log(b)
    // res.send({msg: allBooks})
// }


module.exports.createBook= createBook
module.exports.bookList = bookList
module.exports.getBooksInYear = getBooksInYear
module.exports.getParticularBooks = getParticularBooks
module.exports.getXINRBooks = getXINRBooks
module.exports.getRandomBooks = getRandomBooks
// module.exports.getBooksData= getBooksData