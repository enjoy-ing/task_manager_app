"use client";
import { useState, useEffect } from 'react';

export default function TaskForm({ onSubmit, initialData = null }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    tags: '',
    status: 'Todo'
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;
    onSubmit({ ...formData, id: initialData?.id ?? Date.now(), createdAt: initialData?.createdAt ?? new Date().toISOString() });
    setFormData({ title: '', description: '', dueDate: '', priority: 'Low', tags: '', status: 'Todo' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title *"
          className="border p-2 rounded"
          required
        />
        <input
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Tags (comma-separated)"
          className="border p-2 rounded"
        />
        <select name="priority" value={formData.priority} onChange={handleChange} className="border p-2 rounded">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="border p-2 rounded w-full mt-4"
      ></textarea>
      <select name="status" value={formData.status} onChange={handleChange} className="border p-2 rounded w-full mt-2">
        <option>Todo</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600">
        {initialData ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
}
