
import { useState, useEffect } from "react";
import "./App.css";

const API = "http://localhost:5002/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const response = await fetch(API);
      if (!response.ok) throw new Error("Failed to fetch tasks");

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async () => {
    if (!task.trim()) return;

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: task }),
      });

      if (!response.ok) throw new Error("Failed to add task");

      setTask("");
      fetchTasks();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Complete task
  const toggleTask = async (item) => {
    try {
      const response = await fetch(`${API}/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !item.completed,
        }),
      });

      if (!response.ok) throw new Error("Failed to update task");

      fetchTasks();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete task");

      fetchTasks();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <h1>Student Task Manager</h1>
      <p>Manage your daily tasks efficiently.</p>

      <div className="task-input">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter your task"
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      <h2>My Tasks ({tasks.length})</h2>

      {tasks.map((item) => (
        <div className="task" key={item.id}>
          <span
            onClick={() => toggleTask(item)}
            className={item.completed ? "completed" : ""}
          >
            {item.title}
          </span>

          <button onClick={() => deleteTask(item.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
