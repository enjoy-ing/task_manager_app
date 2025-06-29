"use client";

import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();

const getFromLocalStorage = () => {
  try {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveToLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(getFromLocalStorage());
  }, []);

  useEffect(() => {
    saveToLocalStorage(tasks);
  }, [tasks]);

  const addTask = (task) => setTasks((prev) => [...prev, task]);
  const updateTask = (updated) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  const deleteTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);

