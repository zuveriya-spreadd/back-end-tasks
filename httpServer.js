const http = require('http')
const express = require("express")
const app = express();
const port = process.env.PORT || 2000;

// const server = http.createServer((req,res)=>{
    // res.setHeader('Content-Type',"text/html")
    app.get('/',(req,res)=>
    {
        res.set("Content-Type" , "text/html")
        res.status(200);

        res.send("<h1>This is Demo</h1> <p>Http server demo</p>")
    })
    app.get('/about',(req,res)=>
        {
        res.set("Content-Type" , "text/html")

            res.status(200);
    
            res.send("<h1>This is About</h1> <p>Http server About page</p>")
        })   
    app.get('*',(req,res)=>
    {
        res.set("Content-Type" , "text/html")

        res.status(404);
        
                res.end("<h1>Not Found </h1> <p>Http server does't found page</p>")
    })
// })

app.listen(port , (err)=>{
    if(!err)
    console.log(`Server is listening on port ${port}`)
    else
    console.log(`Server can't start ${err}`)

})