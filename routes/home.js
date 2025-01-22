const express = require("express");
const router = express.Router();
router.get("/home", (req, res, next) => res.send("<h1>Home Page</h1>"));

// Exporting the router
module.exports = router;
