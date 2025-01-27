const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const User = require("./models/user.model")
const jwt = require("jsonwebtoken")
const port = 1000
const bcrypt = require("bcryptjs")

require("dotenv").config()
const MONGO_URI = process.env.MONGO_URI
const JWT_SECRET = process.env.JWT_SECRET
const app = express()
app.use(cors())
app.use(express.json())
mongoose.connect(MONGO_URI)
const db = mongoose.connection
db.on("error", 
    (err) => console.log("Connection with MongoDB Failed : ", err))
db.once("open", 
    () => console.log("Connected with MongoDB")
)
app.post("/v1/auth/register", async (req,res)=>{
    console.log(req.body)
    try{
        const newPassword = await bcrypt.hash(req.body.password, 10)
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword
        })
        res.status(200).json({status:'ok'})
        console.log("User Registered")

    }
    catch(err){
        res.status(404).json({status: "error"})
        console.error("Duplicate Email \n",err)
    }
})

app.post("/v1/auth/login", async (req,res)=>{
    console.log(req.body)
    try{
        const user = await User.findOne({
            email: req.body.email,
          });
          if(!user) {
            return res.status(404).json({status:'error', user: false})
          }
          const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if(isPasswordValid)  {
            const token = jwt.sign({
                name: user.name,
                email: user.email,
            }, 
                JWT_SECRET)
            res.json({status:'ok', user: token})
            console.log("Logged In")
        } 
        else{
            res.status(404).json({status:'error', user: false})
            console.log("Not Logged In, Check an Email & Password")
        }
            
    }
    catch(err){
        res.json({status: "error"})
        console.error(err)
    }
})

app.get("/v1/auth/quote", async (req,res)=>{
    const token = req.headers['x-access-token']
    try{

    const decoded = jwt.verify(token, JWT_SECRET)
    const email= decoded.email;       
    const user = await User.findOne({           
        email: email
    })
    return res.json({status: 'ok', user: user.quote}) 
}
    catch(err){
        res.status(304).json({error: "Invalid Token"})
        console.error(err)
    }
})

app.post("/v1/auth/quote", async (req,res)=>{
    const token = req.headers['x-access-token']
    try{
    const decoded = jwt.verify(token, JWT_SECRET)
    const email= decoded.email;
    await User.updateOne({ email: email }, { $set: { quote: req.body.quote } });
    const user = await User.findOne({ email: email });

    return res.status(200).json({status: 'ok', user: user.quote}) 
}
    catch(err){
        res.status(304).json({error: "Invalid Token"})
        console.error(err)
    }
})

app.listen(port, (err)=>{
    if(err) 
        console.error("Failed to run Server : ", err)
    else
        console.log("Server is running on port : ", port)
})