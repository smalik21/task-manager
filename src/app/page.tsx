import TaskManager from "@/components/TaskManager";
import { Task } from "@/types";
import { initialTasks } from "@/lib/constants";

async function getInitialTasks(): Promise<Task[]> {
  return initialTasks;
}

export default async function HomePage() {
  const initialTasks = await getInitialTasks();

  return <TaskManager initialTasks={initialTasks} />;
}
