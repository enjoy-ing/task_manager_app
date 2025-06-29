"use client";

import Link from 'next/link';

export default function TaskCard({ task, onUpdate, onDelete }) {
  const handleStatusChange = (e) => {
    onUpdate({ ...task, status: e.target.value });
  };

    
  return (
    <div className="bg-white shadow rounded p-4">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold">{task.title}</h3>
        <span className="text-sm bg-gray-200 px-2 py-1 rounded">{task.status}</span>
      </div>
      <p className="text-sm text-gray-600">{task.description}</p>
      <div className="mt-2 text-sm">
        <div><strong>Due:</strong> {task.dueDate || '—'}</div>
        <div><strong>Priority:</strong> {task.priority}</div>
        <div><strong>Tags:</strong> {task.tags}</div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <select
          value={task.status}
          onChange={handleStatusChange}
          className="border p-1 rounded text-sm"
        >
          <option>Todo</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
        <div className="flex gap-2">
          <button onClick={() => onDelete(task.id)} className="text-red-500 text-sm">Delete</button>
          <Link href={`/task/${task.id}`} className="text-blue-600 text-sm hover:underline">
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
