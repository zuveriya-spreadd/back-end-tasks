const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const HTTP = process.env.NEXT_PUBLIC_HTTP_URL;
const URL = process.env.NEXT_PUBLIC_URL;
const port = 1000;

const app = express();
app.use(
  cors({
    origin: `${URL}`,
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
const db = mongoose.connection;

db.on("error", (err) => console.log("Connection with MongoDB Failed:", err));
db.once("open", () => console.log("Connected with MongoDB"));

class Users {
  static async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(404)
          .json({ status: "error", message: "User not found" });
      }
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isPasswordValid) {
        const token = jwt.sign(
          { name: user.name, email: user.email },
          JWT_SECRET,
          { expiresIn: "1h" }
        );
        return res.json({ status: "ok", token });
      } else {
        return res
          .status(400)
          .json({ status: "error", message: "Invalid password" });
      }
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ status: "error", message: "Server error during login" });
    }
  }
  static async register(req, res) {
    try {
      const newPassword = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: newPassword,
      });
      res.status(200).json({ status: "ok", message: "User Registered" });
    } catch (err) {
      res
        .status(400)
        .json({ status: "error", message: "Duplicate email or invalid data" });
    }
  }
}
app.post("/v1/auth/register", (req, res) => Users.register(req, res));
app.post("/v1/auth/login", (req, res) => Users.login(req, res));

// Middleware to verify the token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res
      .status(403)
      .json({ status: "error", message: "Token is required" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(403)
      .json({ status: "error", message: "Malformed token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token Verification Error:", err);
    return res
      .status(401)
      .json({ status: "error", message: "Invalid or expired token" });
  }
};
class Quote{
    static async get(req, res) {
        try {
            const user = await User.findOne({ email: req.user.email });
            if (!user) {
              return res
                .status(404)
                .json({ status: "error", message: "User not found" });
            }
            return res.json({ status: "ok", quote: user.quote });
          } catch (err) {
            console.error(err);
            return res
              .status(500)
              .json({ status: "error", message: "Error retrieving quote" });
          }
}
static async put(req, res) {
    const { quote } = req.body;
  if (!quote) {
    return res
      .status(400)
      .json({ status: "error", message: "Quote is required" });
  }
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
    user.quote = quote;
    await user.save();
    return res.status(200).json({ status: "ok", quote: user.quote });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: "error", message: "Error updating quote" });
  }

}
}
app.get("/v1/auth/quote", verifyToken, async (req, res) => Quote.get(req, res));

app.put("/v1/auth/quote", verifyToken, async (req, res) => Quote.put(req, res));

app.listen(port, (err) => {
  if (err) {
    console.error("Failed to run server:", err);
  } else {
    console.log("Server is running on port:", port);
  }
});
