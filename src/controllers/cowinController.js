let axios = require("axios") 


let getStates = async function (req, res) {

    try {
        let options = {
            method: 'get',
            url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getDistricts = async function (req, res) {
    try {
        let id = req.params.stateId
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getByPin = async function (req, res) {
    try {
        let pin = req.query.pincode
        let date = req.query.date
        console.log(`query params are: ${pin} ${date}`)
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getOtp = async function (req, res) {
    try {
        let blahhh = req.body
        
        console.log(`body is : ${blahhh} `)
        var options = {
            method: "post",
            url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
            data: blahhh
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let findByDistrict = async function(req, res){
    try {
        let id = req.query.district_id
        let date  = req.query.date
        let options = {
            method: "get",
            url:  `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${id}&date=${date}`
        }   
        let result = await axios(options);
        console.log(result.data)
        res.status(200).send({msg: result.data, status: true})
    } catch(error) {
        console.log(error)
        res.status(500).send({msg: error.message})
    }
}

const weather = async function(req, res){
    try {
    let city = req.query.q
    let appKey = req.query.appid
    let options = {
        method: "get",
        url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appKey}`
    }
    let result = await axios(options);
    console.log(result.data)
    res.status(200).send({msg: result.data, status: true})
    } catch(error){
        res.status(500).send({msg: error.message})
    }
}

const temp = async function(req, res){
    try{
        let city = req.query.q
        let appKey = req.query.appid
        let options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appKey}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({msg: result.data.main.temp, status: true})

    } catch(error){
        res.status(500).send({msg: error.message})
    }
}

const sortCitiesByTemp = async function(req, res){
    try{
        let cities = [ "Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"] 
        let temp = []
        for(let i = 0; i < cities.length; i++){
            let q =  cities[i]
            
            let options = {
                method: "get", 
                url: `http://api.openweathermap.org/data/2.5/weather?q=${q}&appid=ab0f41ae1827b4ace59b9f8ae434e876`
            }

            let result = await axios(options)
           
            temp.push({city: cities[i], temp: result.data.main.temp})
            
        }
        let sort = temp.sort((a, b) => {
           return a.temp - b.temp
        } )
        console.log(sort)
        res.status(200).send({msg: sort, status: true})
    } catch(error){
        res.status(500).send({msg: error.message})
    }
}

const meme = async function(req, res){
    try{
        let options = {
            method: "get",
            url: `https://api.imgflip.com/get_memes`
        }
        let result = await axios(options)
        res.status(200).send({msg: result.data, status: true})
    } catch(err){
        res.status(500).send({msg: err.message})
    }
}


const createMeme = async function(req, res){
     try {
        let template_id = req.query.template_id
    let text0 = req.query.text0
    let text1 = req.query.text1
    let username = req.query.username
    let password = req.query.password

    let options = {
        method: "post",
        url: `https://api.imgflip.com/caption_image?template_id=${template_id}&text0=${text0}&text1=${text1}&username=${username}&password=${password}`
    }
    let result = await axios(options)
    res.status(200).send({msg: result.data})
    } catch(err){
        res.status(500).send({msg: err.message})
    }

}
module.exports.getStates = getStates
module.exports.getDistricts = getDistricts
module.exports.getByPin = getByPin
module.exports.getOtp = getOtp

module.exports.findByDistrict = findByDistrict
module.exports.weather = weather
module.exports.temp = temp 
module.exports.sortCitiesByTemp = sortCitiesByTemp 
module.exports.meme = meme 
module.exports.createMeme = createMeme 