const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()
const port = 1000
app.use(cors())

app.use(express.json())

mongoose.connect("mongodb+srv://zuveriya:zuveriya1608@student.9edwp.mongodb.net/?retryWrites=true&w=majority&appName=student",{
})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection ERROR'))
db.once('open', ()=>{
    console.log("Connected to MongoDB")
})


const loginSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password :{
        type:String,
        required:true
    }
})

const Login  = mongoose.model('Login',loginSchema)


app.post('/login',(req,res)=>{
    const { username, password } = req.body;
    const newLogin = new Login(
        {
            username,
            password
        })
    newLogin.save()
    .then( (LoggedIn)=>{
        
            console.log("Login Successfully ", LoggedIn);
            res.status(200).json({error: "Login Successfully"})
        })
    .catch(
        (err)=>{
            console.error("Error in login ", err);
            res.status(500).json({error: "Error in login"})
        }
    )
})


app.listen(port, (err)=>{
    if(!err)      
        console.log(`CORS-enabled Server is running on port ${port}`)
    else
    console.log(`Error ${err}`)

})