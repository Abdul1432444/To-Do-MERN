import axios from "axios";
import React, { useState } from "react";

const TodoItem = ({ todo, fetchTodos }) => {
  // state to track if we are in edit mode
  const [isEditing, setIsEditing] = useState(false);

  // state to store the edited title
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleCompleted = async () => {
    try {
      await axios.put(`http://localhost:5000/api/todos/${todo._id}`, {
        completed: !todo.completed,
      });
      fetchTodos();
    } catch (error) {
      console.log("error updating todo", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${todo._id}`);
      fetchTodos();
    } catch (error) {
      console.log("error during deleting", error);
    }
  };

  const handleEdit = async () => {
    // if input is empty do nothing
    if (!editTitle.trim()) return;
    try {
      // send updated title to backend
      await axios.put(`http://localhost:5000/api/todos/${todo._id}`, {
        title: editTitle,
      });
      // exit edit mode after saving
      setIsEditing(false);
      fetchTodos();
    } catch (error) {
      console.log("error editing todo", error);
    }
  };

  return (
    <div className="flex items-center justify-between p-3 mb-3 border border-gray-200 rounded-lg hover:shadow-md transition">
      {/* if editing show input, otherwise show title */}
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
        {/* show save/cancel buttons when editing, otherwise show all buttons */}
        {isEditing ? (
          <>
            <button
              onClick={handleEdit}
              className="text-sm px-3 py-1 cursor-pionter rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-sm px-3 py-1 rounded-lg cursor-pointer bg-gray-400 hover:bg-gray-500 text-white transition"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm px-3 py-1 cursor-pointer rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition"
            >
              Edit
            </button>
            <button
              onClick={handleCompleted}
              className={`text-sm px-3 py-1 rounded-lg cursor-pointer transition ${
                todo.completed
                  ? "bg-yellow-400 hover:bg-yellow-500 text-white"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              {todo.completed ? "Undo" : "Complete"}
            </button>
            <button
              onClick={handleDelete}
              className="text-sm px-3 py-1 cursor-pointer rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
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
