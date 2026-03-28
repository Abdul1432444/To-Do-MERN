import React, { useState } from "react";
import axios from "axios";

const TodoForm = ({ fetchTodos }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await axios.post("http://localhost:5000/api/todos", { title });
      fetchTodos();
      setTitle("");
    } catch (error) {
      console.log("error adding todo", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="enter a Todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500 transition"
        />
        <button
          type="submit"
          className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
