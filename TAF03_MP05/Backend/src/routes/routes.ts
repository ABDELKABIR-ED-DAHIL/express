import express from "express";
import Todo from "../models/Todo";
const generateUniqueId = require("generate-unique-id");
import {
  addTodo,
  deletTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "../controllers/funTodos";
import todos from "../models/Todos";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(getTodos());
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  res.json(getTodoById(id));
  res.status(201).json({
    id: req.params.id,
    message: "The request has succeeded.",
  });
});

router.post("/", (req, res) => {
  const todo: Todo = {
    id: parseInt(generateUniqueId({ length: 4, useLetters: false })),
    title: req.body.title,
    completed: req.body.completed,
  };
  addTodo(todo);
  res.status(202).json(todo);
});

router.put("/:id", (req, res) => {
  let id = parseInt(req.params.id);
  const updatedTodo: Todo = {
    id: id,
    title: req.body.title,
    completed: req.body.completed,
  };
  if (updatedTodo) {
    res.json(updateTodo(id, updatedTodo));
  }
  res.status(404).send("todo no trouve");
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  res.json(deletTodo(id));
  res.status(201).json("todo suprimer avec succés");
});

export default router;