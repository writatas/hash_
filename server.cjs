const express = require('express')
const app = express()
const {port} = require('./config.cjs')

app.use('/modules',express.static(__dirname + '/modules'))
app.use('/Public',express.static(__dirname + '/Public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/views/hash.html')
})

app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})