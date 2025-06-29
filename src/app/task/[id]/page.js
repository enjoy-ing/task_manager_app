"use client";

import { useParams, useRouter } from 'next/navigation';
import { useTasks } from '../../../context/TaskContext';
import TaskForm from '../../../components/TaskForm';
import { useEffect, useState } from 'react';

export default function TaskDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { tasks, updateTask } = useTasks();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const found = tasks.find((t) => t.id === Number(id));
    if (found) setTask(found);
  }, [id, tasks]);

  if (!task) return <p>Loading...</p>;

  const handleUpdate = (updatedTask) => {
    updateTask(updatedTask);
    router.push('/');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
      <TaskForm onSubmit={handleUpdate} initialData={task} />
    </div>
  );
}
