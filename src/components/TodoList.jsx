import React, { useState } from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos = [], fetchTodos }) => {
  // state to track which filter is active
  const [filter, setFilter] = useState("all");

  // filter todos based on active filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed === true;
    if (filter === "pending") return todo.completed === false;
    return true; // "all" returns everything
  });

  if (todos.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-4">
        No todos yet! Add one above.
      </p>
    );
  }

  return (
    <div>
      {/* filter buttons */}
      <div className="flex gap-2 mb-4">
        {["all", "completed", "pending"].map((btn) => (
          <button
            key={btn}
            onClick={() => setFilter(btn)}
            className={`flex-1 py-1 cursor-pointer rounded-lg text-sm font-medium transition capitalize ${
              filter === btn
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {btn}
          </button>
        ))}
      </div>

      {/* show message if no todos match the filter */}
      {filteredTodos.length === 0 ? (
        <p className="text-center text-gray-400 mt-4">No {filter} todos!</p>
      ) : (
        filteredTodos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} fetchTodos={fetchTodos} />
        ))
      )}
    </div>
  );
};

export default TodoList;
