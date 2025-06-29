"use client";
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white z-50 shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex-1" />

        <h1 className="text-2xl font-bold text-center flex-1">
          <Link href="/" className="hover:opacity-90">Task Manager App</Link>
        </h1>

        <div className="flex-1 flex justify-end items-center space-x-4 text-sm sm:text-base">
          <Link href="/" className="hover:underline">Dashboard</Link>
          <Link href="/create" className="hover:underline">Create Task</Link>
        </div>
      </div>
    </nav>
  );
}
