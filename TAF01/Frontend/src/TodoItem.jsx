import { useState } from 'react';

function TodoItem({ todo, onDelete, onEdit }) {
  const [completed, setCompleted] = useState(todo.completed);

  const handleCheckboxChange = () => {
    setCompleted(!completed);
    // Ajouter ici la logique pour mettre à jour l'état de la tâche dans la base de données
  };

  const handleDeleteClick = () => {
    if (!completed) {
      onDelete(todo.id);
    } else {
      // Afficher un message d'erreur ou prendre une autre action appropriée
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={completed}
        onChange={handleCheckboxChange}
      />
      <span style={{ color: completed ? 'green' : 'red' }}>{todo.title}</span>
      <button onClick={() => onEdit(todo)}>Modifier</button>
      <button onClick={handleDeleteClick}>Supprimer</button>
    </div>
  );
}

export default TodoItem;
