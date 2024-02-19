import React from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface Props {
  todo: Todo;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onDelete, onEdit }) => {
  const handleEdit = () => {
    onEdit(todo.id);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <li>
      <input type="checkbox" checked={todo.completed} readOnly />
      <span>{todo.title}</span>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default TodoItem;
