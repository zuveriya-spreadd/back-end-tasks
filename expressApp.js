const express = require("express");
const path = require("path");
const app = express();
const port = 1000;


// app.get("/", (req, res) => {
//   const { name } = req.body;
//   res.send(`<h1>Hello ${name}</h1>`);
// });

// app.use("/static", express.static(path.join(__dirname, "Static Files")))
app.use("/static", express.static(path.join(__dirname, "Static Files")));

app.use(express.json());

app.get("/hello", (req, res) => res.send("<h1>Hello World </h1>"));

app.get("/file", (req, res) => {
  res.sendFile(path.join(__dirname, "/Static Files/1.jpg"));
});


app.listen(port, (err) => {
  if (!err) console.log(`Server is listening on port ${port}`);
  else console.log(`Server can't start ${err}`);
});
