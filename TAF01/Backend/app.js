import express from 'express';
import router from './api/todos.js'; 
import cors from 'cors'; // Utilisation de la syntaxe ES6

const app = express();
app.use(cors()); // Active CORS pour toutes les routes

app.use(express.json()); // Middleware pour analyser les requêtes JSON

app.use('/todos', router); // Utiliser les routes de todos.js

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
