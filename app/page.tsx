'use client'; // Ensures this component runs in the browser

import React, { useState } from 'react';
import Head from 'next/head';

const Home = () => {
  // State initialization
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [mainTask, setMainTask] = useState<{ id: number; title: string; desc: string }[]>([]);

  // Submit handler
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate inputs
    if (!title.trim() || !desc.trim()) {
      alert('Both Title and Description are required!');
      return;
    }

    // Add new task
    const newTask = { id: Date.now(), title, desc };
    setMainTask((prevTasks) => [...prevTasks, newTask]);

    // Clear input fields
    setTitle('');
    setDesc('');
  };

  // Delete handler
  const deleteHandler = (id: number) => {
    setMainTask((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Render tasks
  const renderTask = () => {
    if (mainTask.length === 0) {
      return <h2 className="text-xl font-medium text-gray-700">No Task Available</h2>;
    }

    return mainTask.map((task) => (
      <li key={task.id} className="flex items-center justify-between mb-5 bg-white p-4 rounded shadow">
        <div className="flex flex-col w-2/3">
          <h5 className="text-2xl font-semibold text-gray-800">{task.title}</h5>
          <p className="text-lg font-medium text-gray-600">{task.desc}</p>
        </div>
        <button
          onClick={() => deleteHandler(task.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-bold"
        >
          Delete
        </button>
      </li>
    ));
  };

  return (
    <>
      {/* Head Section */}
      <Head>
        <title>My To-Do List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="bg-black text-white py-5">
        <h2 className="text-5xl font-bold text-center">MY TO DO LIST</h2>
      </header>

      {/* Form */}
      <form onSubmit={submitHandler} className="p-5">
        <input
          type="text"
          className="text-2xl border-gray-800 border-4 m-4 px-4 py-2 w-1/2"
          placeholder="Enter Task Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="text-2xl border-gray-800 border-4 m-4 px-4 py-2 w-1/2"
          placeholder="Enter Task Description..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button
          type="submit"
          className="bg-black hover:bg-gray-900 text-white px-6 py-2 text-2xl font-semibold rounded m-4"
        >
          Add Task
        </button>
      </form>

      {/* Task List */}
      <div className="p-8 bg-gray-100 min-h-[400px]">
        <ul className="space-y-4">{renderTask()}</ul>
      </div>
    </>
  );
};

export default Home;
