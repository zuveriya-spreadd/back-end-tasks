const http = require("http")
const fs = require("fs")
const express = require("express")
const multer = require("multer")
const app = express()
const storage = multer.diskStorage({
    destination:
    function(req,file,cb){
        cb(null,'./uploads')
    },
    filename:
    function(req,file,cb){
        cb(null,file.originalname)
    } 
})
var upload= multer({storage:storage}).single('fileToUpload')
app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html")
});

// EXPRESS JS POST Request
app.post('/uploadFile', (req,res)=>{
    upload(req,res,function(err){
        if(err)
            return res.end("Error in uploading file")
        res.end("File uploaded successfully")
    })
})  
  
app.listen(2000,function(){  
    console.log("Server is running on port 2000");  
});  


