"use client";

import TaskForm from '../../components/TaskForm';
import { useTasks } from '../../context/TaskContext';
import { useRouter } from 'next/navigation';

export default function CreateTaskPage() {
  const { addTask } = useTasks();
  const router = useRouter();

  const handleCreate = (task) => {
    addTask(task);
    router.push('/');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
      <TaskForm onSubmit={handleCreate} />
    </div>
  );
}
