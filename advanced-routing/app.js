const express = require("express")
const route = express.Router()
const port = 3000
const app = express()
app.use((req,res,next)=>{
    console.log(`[${new Date()}] ${req.method} ${req.url}`)
    next()
})
const cb1 =(req,res,next) =>{
    setTimeout(()=>{
    console.log("Callback Function 1")
        
    },3000)
    // res.send("Hello 1")
    next();
}
const cb2 =(req,res,next) =>{
    console.log("Callback Function 2")
    // res.send("Hello 2")
    next();
}
const cb3 =(req,res,next) =>{
    console.log("Callback Function 3")
    res.send("Hello 3")
}
app.get('/', [cb1,cb2,cb3])

app.listen(port, (err)=>{
    if(!err)
        console.log(`Server is running on port ${port}`)
    else
    console.log(`Error ${err}`)

})
