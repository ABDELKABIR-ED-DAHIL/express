import { useState , useEffect} from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";


function App() {
  const [todos , setTodos] =useState([]);
  const [editingTodo ,setEditingTodo]= useState(null);

  const fetchTodos = async ()=>{
    const response = await fetch('http://localhost:3000/todos')
    const data = await response.json();
    setTodos(data);
  };

  useEffect(()=>{
    fetchTodos();
  } ,[]);

  const onAdd = async (title)=>{
    const response = await fetch('http://localhost:3000/todos', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({title: title , completed:false})
    });
    if (response.ok) {
      const addedTodo = await response.json();
      setTodos([...todos , addedTodo]);
    }
  };
  const onDelete = async (id)=>{
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method:'DELETE',
    });
    if (response.ok) {
      setTodos(todos.filter(todo => todo.id !== id));
    }else{
      console.error('Erreur lors de la suppression du tod ');
    }
  };

  const onEdit =(todo)=>{
    setEditingTodo(todo);
  };

  const onUpdate = async (id, newTitle)=>{
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({title: newTitle , completed:false})
    });
    if (response.ok) {
      setEditingTodo(null);
      fetchTodos();
    }
    const updatedTodos = todos.map(todo =>{
      if (todo.id === id ) {
        return {...todo , text: newTitle};
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  return ( <div >
  <AddTodoForm onAdd={onAdd} onEdit={onEdit}
   onUpdate={onUpdate} editingTodo={editingTodo}/>
   <TodoList todos={todos} onDelete={onDelete} onEdit={onEdit}/>
  </div> );
}

export default App;