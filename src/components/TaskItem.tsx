import { useState } from "react";
import { Task } from "../types";
import { inter } from "@/lib/fonts";

interface TaskItemProps {
  task: Task;
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (taskId: number) => void;
}

export default function TaskItem({
  task,
  onUpdateTask,
  onDeleteTask,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
  });

  const toggleCompleted = () => {
    onUpdateTask({ ...task, completed: !task.completed });
  };

  const handleEditChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveEdit = () => {
    onUpdateTask({
      ...task,
      title: editedTask.title,
      description: editedTask.description,
      priority: editedTask.priority as "high" | "medium" | "low",
    });
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditedTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
    });
  };

  return (
    <div
      className={`task-item ${task.priority} ${
        task.completed ? "completed" : ""
      }`}
    >
      {isEditing ? (
        <div className="task-edit">
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleEditChange}
            placeholder="Title"
            required
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleEditChange}
            placeholder="Description"
            className={`${inter.className}`}
            required
          />
          <select
            name="priority"
            value={editedTask.priority}
            onChange={handleEditChange}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button className="save" onClick={saveEdit}>
            Save
          </button>
          <button className="cancel" onClick={cancelEdit}>
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <button className="delete" onClick={() => onDeleteTask(task.id)}>
            x
          </button>
          <h3 className="title">{task.title}</h3>
          <p className="description">{task.description}</p>
          <div className="item-operations">
            <p>Priority: {task.priority}</p>
            <span>
              <button className="edit" onClick={() => setIsEditing(true)}>
                Edit
              </button>
              <button className="complete" onClick={toggleCompleted}>
                {task.completed ? "Completed" : "Mark as Completed"}
              </button>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
