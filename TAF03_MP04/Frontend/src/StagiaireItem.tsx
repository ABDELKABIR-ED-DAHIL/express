import React from 'react';
import Stagiaire from './Stagiaire';

interface Props {
  stagiaire: Stagiaire;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const StagiaireItem: React.FC<Props> = ({ stagiaire, onDelete, onEdit }) => {
  const handleEdit = () => {
    onEdit(stagiaire.id);
  };

  const handleDelete = () => {
    onDelete(stagiaire.id);
  };

  return (
    <li>
      <span>{stagiaire.name}</span>
      <span>{stagiaire.email}</span>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default StagiaireItem;
