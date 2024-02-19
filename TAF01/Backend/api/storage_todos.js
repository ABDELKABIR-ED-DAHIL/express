import todos from '../storage/todos.js';

// Liste des todos
export const getTodos = () => todos;

// Ajouter un todo
export const createTodo = (newTodo) => {
  todos.push(newTodo);
  return newTodo;
};

// Modifier un todo
export const updateTodo = (id, updatedTodo) => {
  const index = todos.findIndex(todo => todo.id === id);
  if (index !== -1) {
    todos[index] = { ...todos[index], ...updatedTodo };
    return todos[index];
  }
  return null;
};

// Supprimer un todo
export const deleteTodo = (id) => {
  const index = todos.findIndex(todo => todo.id === id);
  if (index !== -1) {
    return todos.splice(index, 1)[0];
  }
  return null;
};

// Méthode pour retourner un seul todo par son id
export const getOneTodo = (id) => {
  return todos.find(todo => todo.id === id);
};

// Méthode pour filtrer les todos selon l’état completed
export const TodosByCompleted = (completed) => {
  return todos.filter(todo => todo.completed === completed);
};

// Méthode pour trier les todos selon id
export const TodosById = () => {
  return todos.sort((a, b) => a.id.localeCompare(b.id));
};

// Méthode pour récupérer les todos dans les pages
export const getTodosParPage = (pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return todos.slice(startIndex, endIndex);
};

// Méthode pour rechercher des tâches par mot-clé
export const searchTodos = (keyword) => {
  return todos.filter(todo => todo.title.toLowerCase().includes(keyword.toLowerCase()));
};
