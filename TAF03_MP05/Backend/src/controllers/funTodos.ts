import todo from "../models/Todo";
import todos from "../models/Todos";

export const getTodos = (): todo[] => todos;

export const getTodoById = (id: number): todo | undefined => {
  const todo = todos.find((todo) => todo.id === id);
  return todo;
};

export const addTodo = (todo: todo) => {
  todos.push(todo);
  return todos;
};

export const deletTodo = (id: number) => {
  const idTodo = todos.findIndex((todo) => todo.id == id);
  if (idTodo !== -1) {
    return todos.splice(idTodo, 1);
  }
};

export const updateTodo = (id: number, updatedTodo: todo) => {
  const idTodo = todos.findIndex((todo) => todo.id === id);
  if (idTodo !== -1) {
    todos[idTodo] = updatedTodo;
    return todos;
  }
  return null;
};