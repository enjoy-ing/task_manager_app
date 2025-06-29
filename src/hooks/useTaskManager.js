"use client";
import { useEffect, useState } from 'react';

const getFromLocalStorage = () => {
  try {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveToLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export default function useTaskManager() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ status: '', tag: '', due: '', sort: 'createdAt' });

  useEffect(() => {
    setTasks(getFromLocalStorage());
  }, []);

  useEffect(() => {
    saveToLocalStorage(tasks);
  }, [tasks]);

  const addTask = (task) => setTasks([...tasks, task]);

  const updateTask = (updated) => {
    setTasks(tasks.map((task) => (task.id === updated.id ? updated : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks
    .filter((task) =>
      filters.status ? task.status === filters.status : true
    )
    .filter((task) =>
      filters.tag ? task.tags.toLowerCase().includes(filters.tag.toLowerCase()) : true
    )
    .filter((task) => {
      if (filters.due === 'today') {
        const today = new Date().toISOString().slice(0, 10);
        return task.dueDate === today;
      }
      if (filters.due === 'week') {
        const now = new Date();
        const weekFromNow = new Date();
        weekFromNow.setDate(now.getDate() + 7);
        return task.dueDate >= now.toISOString().slice(0, 10) && task.dueDate <= weekFromNow.toISOString().slice(0, 10);
      }
      return true;
    })
    .sort((a, b) => {
      if (filters.sort === 'priority') {
        const priorities = { Low: 1, Medium: 2, High: 3 };
        return priorities[b.priority] - priorities[a.priority];
      }
      return new Date(a[filters.sort]) - new Date(b[filters.sort]);
    });

  return { tasks, addTask, updateTask, deleteTask, filteredTasks, filters, setFilters };
}
