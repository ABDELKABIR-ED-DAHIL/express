import { useState } from "react";
import Todo from "./Todo";
import Todos from "./Todos";


const AddTodo :React.FC<Todos>= ({addTodo}) => {
  const [title, setTitle] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);

  const handleAddStagiaire = (e: React.FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    const todo : Todo = {title, completed};
    addTodo(todo)
    setTitle('')
    setCompleted(false)
  }

  return (
    <div>
      <h2>Ajouter Todo</h2>
      <form onSubmit={handleAddStagiaire}>
        <label>
          Title:
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Completed:
          <input
            type="checkbox"
            checked={completed}
            onChange={() => setCompleted(!completed)}
          />
        </label>
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddTodo;