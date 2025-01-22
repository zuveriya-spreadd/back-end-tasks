const express = require("express")
const router = express.Router()
const app = express()
app.use(express.json())
router.route('/')
.all((req,res,next) =>{
    res.statusCode = 200
    res.setHeader("Content-Type", "text/html")
    next()
})
.get((req,res,next)=>
{
    console.log("GET request is made"),
    res.send("<h1>GET request </h1>")
}
)
.post((req,res,next)=>
{
    console.log("POST request is made"),
    res.send("<h1>POST request </h1>")
}

)
.put((req,res,next)=>
{
    console.log("PUT request is made"),
    res.send("<h1>PUT request </h1>")
}

)
.delete((req,res,next)=>
    {
    console.log("DELETE request is made"),
    res.send("<h1>DELETE request </h1>")
    }

)

module.exports = router