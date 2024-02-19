import React, { useState } from "react";
import Todo from "./Todo";

interface UpdateTodoProps {
  updateTodoData: Todo;
  setUpdateTodoData: (todo: Todo | null) => void;
  handleUpdateSubmit: (updatedTodo: Todo) => void;
}

const UpdateTodo: React.FC<UpdateTodoProps> = ({
  updateTodoData,
  setUpdateTodoData,
  handleUpdateSubmit,
}) => {
  const [updatedTodo, setUpdatedTodo] = useState<Todo>({ ...updateTodoData });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedTodo({
      ...updatedTodo,
      title: e.target.value,
    });
  };

  const handleCompletedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedTodo({
      ...updatedTodo,
      completed: e.target.checked,
    });
  };

  const handleCancel = () => {
    setUpdateTodoData(null);
  };

  const handleUpdateSubmitLocal = () => {
    handleUpdateSubmit(updatedTodo);
    setUpdateTodoData(null);
  };

  return (
    <div>
      <h3>Update Todo</h3>
      <label>
        Title:
        <input
          type="text"
          value={updatedTodo.title}
          onChange={handleTitleChange}
        />
      </label>
      <br />
      <label>
        Completed:
        <input
          type="checkbox"
          checked={updatedTodo.completed}
          onChange={handleCompletedChange}
        />
      </label>
      <br />
      <button onClick={handleUpdateSubmitLocal}>Update Todo</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default UpdateTodo;
