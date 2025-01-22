const express = require("express")
const port = 3000
const book = require('./book')

const app = express()

app.get(
    "/",
    (req, res, next) => {
      console.log("Hello");
      next();
    },
    (req, res) => {
      res.send(`<div>
              <h1> Welcome to the BookSite</h1>
              </div>`);
    }
  );
app.use('/book',book)

app.listen(port, (err)=>{
    if(!err)
        
        console.log(`Server is running on port ${port}`)
    else
    console.log(`Error ${err}`)

})