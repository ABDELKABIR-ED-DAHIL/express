import Todo from "./Todo";
interface Todos {
    addTodo: (todo: Todo) => void;
    deleteTodo?:(id:number)=>void
    updateTodo?:(id:number|null,updateTodo:Todo)=>void
    todos:Todo[]
}

export default Todos;