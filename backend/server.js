
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];
let nextId = 1;

app.get("/", (req, res) => {
  res.send("Student Task Manager Backend Running!");
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend is healthy"
  });
});

// Get all tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// Create task
app.post("/api/tasks", (req, res) => {
  const { title } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      message: "Task title is required"
    });
  }

  const newTask = {
    id: nextId++,
    title: title.trim(),
    completed: false
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// Update task
app.put("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  task.completed = req.body.completed;
  res.json(task);
});

// Delete task
app.delete("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const oldLength = tasks.length;

  tasks = tasks.filter(t => t.id !== id);

  if (tasks.length === oldLength) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  res.json({
    message: "Task deleted successfully"
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
