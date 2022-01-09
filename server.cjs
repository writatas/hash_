const express = require('express')
const rateLimit = require('express-rate-limit')
const app = express()
const {port} = require('./config.cjs')
const apiLimiter = rateLimit({
    windowMS: 15 * 60 * 1000, //15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standartHeaders:true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders:false // Disable the `X-RateLimit-*` headers
})
//use the limiter on all endpoints
app.use('/',apiLimiter)
app.use('/modules',express.static(__dirname + '/modules'))
app.use('/Public',express.static(__dirname + '/Public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/views/hash.html')
})

app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})
