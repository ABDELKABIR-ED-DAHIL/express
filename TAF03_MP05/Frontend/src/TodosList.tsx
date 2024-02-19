import React, { useState } from "react";
import Todo from "./Todo";
import Todos from "./Todos";

interface TodoListProps {
  todos: Todo[];
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, updatedTodo: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, deleteTodo, updateTodo }) => {
  const [updateTodoData, setUpdateTodoData] = useState<Todo | null>(null);

  const handleUpdate = (todo: Todo): void => {
    setUpdateTodoData(todo);
  };

  const handleUpdateSubmit = (): void => {
    if (!updateTodoData) return;
    updateTodo(updateTodoData.id, updateTodoData); // Correction here
    setUpdateTodoData(null);
  };

  const handleDelete = (id: number): void => deleteTodo(id);

  return (
    <div>
      <h2>List  Todos</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} -{" "}
            {todo.completed ? "completed" : "not completed "}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
            <button onClick={() => handleUpdate(todo)}>Edit</button>
          </li>
        ))}
      </ul>

      {updateTodoData && (
        <div>
          <h3>Update Todo</h3>
          <label>
            Title:
            <input
              type="text"
              value={updateTodoData.title}
              onChange={(e) =>
                setUpdateTodoData({
                  ...updateTodoData,
                  title: e.target.value,
                })
              }
            />
          </label>
          <br />
          <label>
            Completed:
            <input
              type="checkbox"
              checked={updateTodoData.completed}
              onChange={(e) =>
                setUpdateTodoData({
                  ...updateTodoData,
                  completed: e.target.checked,
                })
              }
            />
          </label>
          <br />
          <button onClick={() => handleUpdateSubmit()}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoList;
