const express = require("express")
const route = express.Router()

route.route('/')
.get((req,res)=>{
    const bookId = req.params.id
    console.log('GET request')
    res.send(`<h1>Got a Book  </h1>`)
})


// use the url http://localhost:3000/book/1
route.route('/:id(\\d+)')
.all((req,res,next) =>{
const bookId = req.params.id
    res.statusCode = 200
    res.setHeader("Content-Type", "text/html")
    next()
})


.get((req,res)=>{
    const bookId = req.params.id
    console.log('GET request with ID')
    res.send(`<h1>Got a Book id : ${bookId} </h1>`)
})

.post((req,res)=>{
    const bookId = req.params.id
    
    console.log('POST request')
    res.send(`<h1>Added a book with Book id : ${bookId} </h1>`)
})

.put((req,res)=>{
    const bookId = req.params.id

    console.log('PUT request')
    res.send(`<h1>Updated a book with Book id : ${bookId} </h1>`)
})

.delete((req,res)=>{
    const bookId = req.params.id

    console.log('DELETE request')
    res.send(`<h1>Deleted a book with Book id : ${bookId} </h1>`)
})

module.exports = route