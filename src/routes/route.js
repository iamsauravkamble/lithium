const express = require('express');
const router = express.Router();///test-you
//importing a custom module
const xyz = require('../logger/logger')
const pr2 = require('../util/helper')
const pr3 = require('../validator/formatter')
//importing external package
const underscore = require('underscore')
const lodash = require('lodash')

router.get('/test-me', function (req, res) {
    //Calling the components of a different custom module
    console.log("Calling my function ",xyz.welcomeFunction())
    console.log("The value of the constant is ", xyz.myUrl)
        //Trying to use an external package called underscore
  let myArray = ['Akash', 'Pritesh', 'Sabiha'];
  let result = underscore.first(myArray);
  console.log("The result of underscores examples api is : ", result)

    console.log("Current date", pr2.printDate)
    console.log("Current month", pr2.printMonth)
    console.log("Batch info", pr2.outerGetBatchInfo())

    console.log("trim string", pr3.trim())
    console.log("lower case string", pr3.lower())
    console.log("upper case string", pr3.upper())

    const arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const result1 = lodash.chunk(arr, 4)
    console.log(result1)

    const oddNum = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
    const result2 = lodash.tail(oddNum)
    console.log(result2)

    const arr2 = ([2,4,6,8,10,4,12,16,8])    
    const result3 = lodash.union(arr2)
    console.log(result3)

    const arr3 =  [['horror','The Shining'],['drama','Titanic'],['thriller','Shutter Island'],['fantasy','Pans Labyrinth']]
    const result4 = lodash.fromPairs(arr3)
    console.log(result4)
    
    res.send('My first ever api!')

    //To be tried what happens if we send multiple response
    //res.send('My second api!')
});

module.exports = router;

