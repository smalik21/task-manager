# Task Managemer

A responsive task management application built using Next.js with TypeScript. The app allows users to add, edit, delete, and manage tasks, as well as sort tasks by priority. It supports server-side rendering (SSR) for loading initial tasks and uses local storage for persisting tasks across page reloads.

## Getting Started

### Prerequisites

Make sure you have Node.js (v14 or above) installed on your system.

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/smalik21/task-manager.git
   cd task-manager
   ```
2. **Install the dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```

## Sorting Logic
### Overview
The sorting logic is implemented in `TaskList.tsx` to ensure that tasks are displayed in a prioritized manner. Here's how the logic works:

- Completed Tasks: Completed tasks are displayed at the bottom of the list.
- Priority Order: Pending tasks are sorted by their priority, with high-priority tasks appearing first, followed by medium and low-priority tasks.
- Filtering: The list also supports filtering based on a search term entered by the user, matching the task title or description.
### Code Snippet

```typescript
const sortedTasks = filteredTasks.sort((a, b) => {
  if (a.completed !== b.completed) return a.completed ? 1 : -1;
  const priorities = { high: 1, medium: 2, low: 3 };
  return priorities[a.priority] - priorities[b.priority];
});
```

In this function:
- Filtering: filteredTasks is derived from the original list of tasks based on the search term.
- Sorting: It first places all incomplete tasks before completed ones. Then, it sorts the incomplete tasks by priority using a numerical mapping (1 for high, 2 for medium, 3 for low).
- This ensures that tasks are displayed in a meaningful order, helping users prioritize their work effectively.
