const express = require("express");
require("dotenv").config();

const cors = require("cors");
const mongoose = require("mongoose");
const todoModel = require("./models/todoList");
const todoList = require("./models/todoList");
const router = express.Router();
const port = 1000;
const app = express();
app.use(cors());

app.use(express.json());
const con = process.env.MONGO_URI;
mongoose.connect(con);

mongoose.connection.on("error", (err) => {
  console.error("Connection Failed: ", err);
});
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

class TodoService {
  static async get(req, res) {
    todoModel
      .find()
      .then((todoList) => {
        if (todoList) res.json(todoList);
        else res.status(404).json({ error: "Not Found" });
      })
      .catch((err) => res.json(err));
  }

  static async getById(req, res) {
    const id = req.params.id;
    todoModel
      .findById({ _id: id })
      .then((todo) => {
        if (todo) res.json(todo);
        else res.status(404).json({ error: "Not Found" });
      })
      .catch((err) => res.json(err));
  }

  static create(req, res) {
    todoModel
      .create({
        task: req.body.task,
        status: req.body.status,
        deadline: req.body.deadline,
      })
      .then((todo) => res.status(200).json(todo))
      .catch((err) => res.status(500).json(err));
  }

  static update(req, res) {
    const id = req.params.id;
    const updateTodo = {
      task: req.body.task,
      status: req.body.status,
      deadline: req.body.deadline,
    };
    todoModel
      .findByIdAndUpdate(id, updateTodo, { new: true })
      .then((todo) => {
        if (todo) res.json(todo);
        else res.status(404).json({ error: "Not Found" });
      })
      .catch((err) => res.json(err));
  }

  static delete(req, res) {
    const id = req.params.id;
    todoModel
      .findByIdAndDelete({ _id: id })
      .then((todo) => {
        if (todo) res.json(todo);
        else res.status(404).json({ error: "Not Found" });
      })
      .catch((err) => res.json(err));
  }
}

app.use("/v1", router);

router.get("/todos", (req, res) => TodoService.get(req, res));
router.get("/todos/:id", (req, res) => TodoService.getById(req, res));
router.post("/todos/", (req, res) => TodoService.create(req, res));
router.put("/todos/:id", (req, res) => TodoService.update(req, res));
router.delete("/todos/:id", (req, res) => TodoService.delete(req, res));

app.listen(port, (err) => {
  if (!err) console.log(`CORS-enabled Server is running on port ${port}`);
  else console.log(`Error ${err}`);
});
