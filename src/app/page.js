"use client";
import TaskList from '../components/TaskList';
import FilterBar from '../components/FilterBar';
import { useTasks } from '../context/TaskContext';
import { useMemo, useState } from 'react';
import { saveAs } from 'file-saver';

export default function HomePage() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const [filters, setFilters] = useState({ status: '', tag: '', due: '', sort: 'createdAt' });

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => (filters.status ? task.status === filters.status : true))
      .filter((task) => (filters.tag ? task.tags.toLowerCase().includes(filters.tag.toLowerCase()) : true))
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
  }, [tasks, filters]);

  const handleExport = () => {
  const data = JSON.stringify(tasks, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  saveAs(blob, "tasks.json");
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (Array.isArray(imported)) {
          imported.forEach((task) => addTask(task));
        }
      } catch (err) {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  };

return (
  <div className="space-y-6">
    {/* Export/Import Panel */}
    <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h2 className="text-lg font-semibold text-gray-800">Manage Your Tasks</h2>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleExport}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Export Tasks
        </button>

        <label className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition">
          Import Tasks
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </label>
      </div>
    </div>

    {/* Filter Bar */}
    <div className="bg-white border rounded-lg shadow-sm p-4">
      <FilterBar filters={filters} setFilters={setFilters} />
    </div>

    {/* Task List */}
    <div className="bg-white border rounded-lg shadow-sm p-4">
      <TaskList
        tasks={filteredTasks}
        onUpdate={updateTask}
        onDelete={deleteTask}
      />
    </div>
  </div>
);

}