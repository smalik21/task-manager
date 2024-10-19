"use client";

import { Task } from "@/types";
import { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

interface TaskItemProps {
  initialTasks: Task[];
}

export default function TaskManager({ initialTasks }: TaskItemProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      try {
        const parsedTasks: Task[] = JSON.parse(storedTasks);
        setTasks(parsedTasks);
      } catch (error) {
        console.error("Failed to parse tasks from localStorage:", error);
        setTasks(initialTasks);
      }
    } else {
      setTasks(initialTasks);
    }
    setIsInitialized(true);
  }, [initialTasks]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [isInitialized, tasks]);

  const addTask = (newTask: Task) => setTasks([newTask, ...tasks]);
  const updateTask = (updatedTask: Task) =>
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  const deleteTask = (taskId: number) =>
    setTasks(tasks.filter((task) => task.id !== taskId));

  return (
    <div>
      <TaskForm onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
      />
    </div>
  );
}
