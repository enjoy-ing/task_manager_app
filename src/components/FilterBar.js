"use client";
export default function FilterBar({ filters, setFilters }) {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6 bg-gray-100 p-4 rounded">
      <select name="status" value={filters.status} onChange={handleChange} className="border p-2 rounded">
        <option value="">All Statuses</option>
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      <input
        name="tag"
        value={filters.tag}
        onChange={handleChange}
        placeholder="Filter by tag"
        className="border p-2 rounded"
      />

      <select name="due" value={filters.due} onChange={handleChange} className="border p-2 rounded">
        <option value="">All Tasks</option>
        <option value="today">Due Today</option>
        <option value="week">Due this Week</option>
      </select>

      <select name="sort" value={filters.sort} onChange={handleChange} className="border p-2 rounded">
        <option value="createdAt">Sort by Creation</option>
        <option value="dueDate">Sort by Due Date</option>
        <option value="priority">Sort by Priority</option>
      </select>
    </div>
  );
}