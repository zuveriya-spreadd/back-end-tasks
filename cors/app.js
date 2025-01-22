const express = require("express")
const cors = require("cors")
const { options } = require("../http-objs/test")
const app = express()
const port = 3000
app.use(cors())
app.get('/',(req,res)=>{
    res.json({msg : 'CORS-enabled for all origins'})
})


// Configuring CORS

var corOpts = {
    origin: "www.google.com",
    optionsSuccessStatus:200
}
app.get('/book/:id(\\d+)', cors(corOpts),(req,res,next)=>{
    res.json({Bookid : req.params.id})
})


//Enabling CORS Pre-Flight

app.options('/book/:id(\\d+)',cors())
app.delete('/book/:id(\\d+)',cors(),(req,res,next)=>{
    res.send("Enabling CORS Pre-Flight")
    console.log("Enabled pre-flight request for DELETE request")
})
app.listen(port, (err)=>{
    if(!err)
        
        console.log(`CORS-enabled Server is running on port ${port}`)
    else
    console.log(`Error ${err}`)

})