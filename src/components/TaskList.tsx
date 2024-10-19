import TaskItem from "./TaskItem";
import { Task } from "../types";
import { useState } from "react";

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (taskId: number) => void;
}

export default function TaskList({
  tasks,
  onUpdateTask,
  onDeleteTask,
}: TaskListProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    const priorities = { high: 1, medium: 2, low: 3 };
    return priorities[a.priority] - priorities[b.priority];
  });

  return (
    <div className="task-list">
      <input
        type="text"
        className="search-input"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {sortedTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
}
