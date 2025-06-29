"use client";
import './globals.css';
import Navbar from '../components/Navbar';
import { TaskProvider } from '../context/TaskContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black transition-colors duration-300">
        <TaskProvider>
          <Navbar />
          <main className="pt-20 p-6 max-w-4xl mx-auto">{children}</main>
        </TaskProvider>
      </body>
    </html>
  );
}
