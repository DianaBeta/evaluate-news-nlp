const fetch = require("node-fetch");
let baseURL=  	'https://api.meaningcloud.com/sentiment-2.1';

const dotenv = require('dotenv');
dotenv.config();
var textapi = process.env.API_KEY;

var bodyParser = require('body-parser')
var path = require('path')
const express = require('express')
var cors = require('cors')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

app.use(express.static('dist'))
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/all', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})


//Todo: API CALL
const getSentiment = async (baseURL, text, key)=>{
    
    const res = await fetch(baseURL+'?url='+ text +'&key='+ key + '&lang=en')
    try{
        const data=await res.json();
        console.log(data)
        return data;
    } catch(error){
        console.log("error", error)
    }
}
// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})
//POST route: sends the data to the project endpoint
app.post('/api', function (req, res) {
    console.log('/api called via post request')
    console.log(req.body.text);
    
    getSentiment(baseURL, req.body.text, textapi).then(
        apiResponse => {
        console.log(apiResponse)
        res.json(apiResponse);
    });


    
})
