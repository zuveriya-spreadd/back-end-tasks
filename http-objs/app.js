const express = require("express")
const test = require("./test.js")
const app = express()
const PORT = process.env.port || 3000

app.use('/test',test)
app.use('/',(req,res)=>{
    res.send("<h1>Write <i>test</i> in the url </h1>")

})
app.listen(PORT, ()=> console.log(`Server is running on PORT ${PORT}`))