import TaskManager from "@/components/TaskManager";
import { Task } from "@/types";

async function getInitialTasks(): Promise<Task[]> {
  return [
    {
      id: 1,
      title: "Task 1",
      description: "Description 1",
      priority: "high",
      completed: false,
    },
    {
      id: 2,
      title: "Task 2",
      description: "Description 2",
      priority: "medium",
      completed: false,
    },
    {
      id: 3,
      title: "Task 3",
      description: "Description 3",
      priority: "low",
      completed: true,
    },
  ];
}

export default async function HomePage() {
  const initialTasks = await getInitialTasks();

  return <TaskManager initialTasks={initialTasks} />;
}
