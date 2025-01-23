const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const todoModel = require("./models/todoList")
const todoList = require("./models/todoList")
const port = 1000
const app = express()
app.use(cors())


app.use(express.json())
// const con = process.env.CON
const con = "mongodb+srv://zuveriya:zuveriya1608@student.9edwp.mongodb.net/?retryWrites=true&w=majority&appName=student"

mongoose.connect(con)

mongoose.connection.on('error', (err)=>{
    console.error("Connection Failed : " , err)
})
mongoose.connection.once("open", ()=>{
    console.log("Connected to MongoDB")
})

app.get("/getTodo", (req,res)=>{
    todoModel.find()
    .then((todoList) => res.json(todoList))
    .catch((err) => res.json(err))
})

app.post("/addTodo", (req,res)=>{
    todoModel.create({
        task:req.body.task,
        status:req.body.status,
        deadline: req.body.deadline,
    })
    .then((todo)=>(res.json(todo)))
    .catch((err) => res.json(err))

})

app.post("/updateTodo/:id",(req,res)=>{
    const id= req.params.id;
    const updateTodo = {
        task:req.body.task,
        status:req.body.status,
        deadline: req.body.deadline,
    }
    todoModel.findByIdAndUpdate(id,updateTodo)
        .then((todo)=>res.json(todo))
         .catch((err) => res.json(err))

})

app.delete("/deleteTodo/:id", (req,res)=>{
    const id = req.params.id
    todoModel.findByIdAndDelete({_id:id})
    .then((todo)=>res.json(todo))
         .catch((err) => res.json(err))
})


app.listen(port, (err)=>{
    if(!err)      
        console.log(`CORS-enabled Server is running on port ${port}`)
    else
    console.log(`Error ${err}`)

})