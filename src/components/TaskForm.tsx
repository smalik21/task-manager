import { useState } from "react";
import { Task } from "../types";
import { inter } from "@/lib/fonts";

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask({
      id: Date.now(),
      title,
      description,
      priority,
      completed: false,
    });
    setTitle("");
    setDescription("");
    setPriority("medium");
    setIsFormVisible(false);
  };

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="task-form-container">
      <button className="toggle-form-btn" onClick={toggleForm}>
        {isFormVisible ? "Hide Form" : "Add New Task"}
      </button>
      <div className={`task-form-wrapper ${isFormVisible ? "visible" : ""}`}>
        <form className="task-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`${inter.className}`}
            required
          />
          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as "high" | "medium" | "low")
            }
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button type="submit">Add Task</button>
        </form>
      </div>
    </div>
  );
}
