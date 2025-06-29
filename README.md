# Task Manager App

A frontend-only task manager built with Next.js and Tailwind CSS.  
Users can create, view, edit, filter, sort, and persist tasks directly in the browser using `localStorage`.

---
## Live Demo

https://task-manager-8h6hpy7sd-karans-projects-33ac8de6.vercel.app/

## Features

1. Add, Edit & Delete Tasks - Easily create new tasks, update existing ones, and remove completed or unwanted tasks.

2. Advanced Filtering - Filter tasks by Status (Todo, In Progress, Done), Tags, and Due Date (e.g., Today, This Week).

3. Sorting Options - Sort tasks by Priority, Due Date, or Creation Date to keep your workflow organized.

4. Export / Import as JSON - Backup your tasks or transfer them across browsers using JSON export and import.

5. Responsive Design - A clean and responsive UI that works across mobile, tablet, and desktop.

6. Persistent Storage - All tasks are saved in the browser using localStorage and persist across sessions.

---

## Tech Stack

- [Next.js 14](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Context](https://reactjs.org/docs/context.html)
- [FileSaver.js](https://www.npmjs.com/package/file-saver)
---

## 📦 Installation

git clone https://github.com/enjoy-ing/task_manager_app.git
cd task_manager_app
npm install
npm run dev

Visit http://localhost:3000 to view the application.

## Deployment on Vercel
To deploy the project to Vercel:
Go to https://vercel.com/ and sign in with your GitHub account.
Click "Add New Project" and import the task_manager_app repository.
Use the default settings (Next.js is detected automatically).
Click "Deploy".
