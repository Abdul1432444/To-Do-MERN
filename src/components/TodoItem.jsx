import axios from "axios";
import React, { useState } from "react";
import API from "../../api";

const TodoItem = ({ todo, fetchTodos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const API = import.meta.env.VITE_API_URL;

  const handleCompleted = async () => {
    try {
      await axios.put(`${API}/api/todos/${todo._id}`, {
        completed: !todo.completed,
      });
      fetchTodos();
    } catch (error) {
      console.log("error updating todo", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API}/api/todos/${todo._id}`);
      fetchTodos();
    } catch (error) {
      console.log("error during deleting", error);
    }
  };

  const handleEdit = async () => {
    if (!editTitle.trim()) return;

    try {
      await axios.put(`${API}/api/todos/${todo._id}`, {
        title: editTitle,
      });
      setIsEditing(false);
      fetchTodos();
    } catch (error) {
      console.log("error editing todo", error);
    }
  };

  return (
    <div className="flex items-center justify-between p-3 mb-3 border border-gray-200 rounded-lg hover:shadow-md transition">
      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="flex-1 border border-blue-400 rounded-lg px-3 py-1 outline-none text-sm"
        />
      ) : (
        <span
          className={`text-gray-800 text-sm flex-1 ${
            todo.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {todo.title}
        </span>
      )}

      <div className="flex gap-2 ml-4">
        {isEditing ? (
          <>
            <button
              onClick={handleEdit}
              className="text-sm px-3 py-1 bg-blue-500 text-white rounded-lg"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-sm px-3 py-1 bg-gray-400 text-white rounded-lg"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm px-3 py-1 bg-blue-500 text-white rounded-lg"
            >
              Edit
            </button>
            <button
              onClick={handleCompleted}
              className="text-sm px-3 py-1 bg-green-500 text-white rounded-lg"
            >
              {todo.completed ? "Undo" : "Complete"}
            </button>
            <button
              onClick={handleDelete}
              className="text-sm px-3 py-1 bg-red-500 text-white rounded-lg"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
