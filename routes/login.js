const express = require("express");
const router = express.Router();
router.get("/login", (req, res, next) => res.send("<h1>Login Page</h1>"));

module.exports = router;
