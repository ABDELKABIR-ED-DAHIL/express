import express from "express";
import generateUniqueId from "generate-unique-id";
import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
  getOneTodo,
  TodosByCompleted,
  TodosById,
  getTodosParPage,
  searchTodos,
} from "./storage_todos.js";


const router = express.Router();

//route pour retourner la liste des todos
router.get('', (req, res) => {
  res.json(getTodos());
});
//route pour ajouter un todo
router.post('/', (req, res) => {
  // Générer un ID unique
  const id = generateUniqueId({ length: 10, useLetters: false });
  const newTodo = createTodo({
    id: id,
    title: req.body.title,
    completed: req.body.completed
  });
  res.status(201).json(newTodo);
});

//route pour modifier un todo
router.put('/:id', (req, res) => {
  const updatedTodo = updateTodo(req.params.id, req.body);
  if (updatedTodo) {
    res.json(updatedTodo);
  } else {
    res.status(404).send('Todo non trouvé');
  }
});

//route pour supprimer un todo
router.delete('/:id', (req, res) => {
  const deletedTodo = deleteTodo(req.params.id);
  if (deletedTodo) {
    res.json(deletedTodo);
  } else {
    res.status(404).send('Todo non trouvé');
  }
});

// route pour retourner un seul todo par son id
router.get('/:id', (req, res) => {
  const todo = getOneTodo(req.params.id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).send('Todo non trouvé');
  }
});

// route pour filtrer les todos selon l’état completed
router.get('/completed/:status', (req, res) => {
  const completedStatus = req.params.status.toLowerCase() === 'true';
  res.json(TodosByCompleted(completedStatus));
});

// route pour trier les todos selon id
router.get('/sort/sortById', (req, res) => {
  const sortedTodos = TodosById();
  if (sortedTodos.length > 0) {
    res.json(sortedTodos);
  } else {
    res.status(404).send('Aucun todo trouvé');
  }
});

// route pour récupérer les todos dans les pages
router.get('/paginate/:pageNumber/:tasksPerPage', (req, res) => {
  const pageNumber = parseInt(req.params.pageNumber);
  const tasksPerPage = parseInt(req.params.tasksPerPage);
  res.json(getTodosParPage(pageNumber, tasksPerPage));
});

// route pour rechercher des tâches par mot-clé
router.get('/search/:keyword', (req, res) => {
  const keyword = req.params.keyword;
  res.json(searchTodos(keyword));
});


export default router;
