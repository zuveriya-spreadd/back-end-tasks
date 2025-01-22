const express = require("express");
const port = process.env.port || 3000;
const homepage = require("./routes/Home.js");
const loginpage = require("./routes/login.js");
const app = express();

// Express JS Basic Routing Example
app.get(
  "/",
  (req, res, next) => {
    console.log("Hello");
    next();
  },
  (req, res) => {
    res.send(`<div>
            <h1> Welcome to the Site</h1>
            <p>Demo of Middleware </p>
            </div>`);
  }
);
app.use("/", homepage);
app.use("/", loginpage);
app.listen(port, () => console.log(`Server is running on port ${port}`));
