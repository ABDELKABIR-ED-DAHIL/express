import AddTodoForm from "./AddTodoForm";
import Axios from "./api";
import { useEffect, useState } from "react";
import TodosList from "./TodosList";
import Todo from "./Todo";
function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const getTodos = async (): Promise<void> => {
    try {
      const response = await Axios.get<Todo[]>(`/todos`);
      setTodos(response.data);
    } catch (error) {
      alert("Error fetching todos");
    }
  };

  const addTodo = async (newTodo: Todo): Promise<void> => {
    try {
      const { data }: any = await Axios.post("/todos", newTodo);
      setTodos([...todos, data]);
    } catch (error) {
      alert("Error adding todo");
    }
  };

  const deleteTodo: (id: number) => Promise<void> = async (id) => {
    await Axios
      .delete(`/todos/${id}`)
      .then(() => {
        setTodos((prev) => prev.filter((stagiaire) => stagiaire.id !== id));
      })
      .catch(() => alert(`Error deleting stagiaire with id ${id}`));
  };

  const updateTodo = (id: number, updatedTodo: Todo) => {
    Axios
      .put(`/todos/${id}`, updatedTodo)
      .then(() => {
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === id
              ? {
                  ...todo,
                  title: updatedTodo.title,
                  completed: updatedTodo.completed,
                }
              : todo
          )
        );
      })
      .catch(() => alert(`Error updating stagiaire with id ${id}`));
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <AddTodoForm addTodo={addTodo} todos={[]} />
      <TodosList
        todos={todos}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default App;