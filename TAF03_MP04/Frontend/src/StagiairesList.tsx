import React, { useState } from 'react';
import Stagiaire from './Stagiaire';
import Stagiaires from './Stagiaires';

interface StagiairesListProps {
  stagiaires: Stagiaire[];
  deleteStagiaire: (id: number) => void;
  updateStagiaire: (id: number, updatedStagiaire: Stagiaire) => void;
}

const StagiairesList: React.FC<StagiairesListProps> = ({ stagiaires, deleteStagiaire, updateStagiaire }) => {
  const [updateStagiaireData, setUpdateStagiaireData] = useState<Stagiaire | null>(null);

  const handleUpdate = (stagiaire: Stagiaire): void => {
    setUpdateStagiaireData(stagiaire);
  };

  const handleUpdateSubmit = (): void => {
    if (!updateStagiaireData) return;
    updateStagiaire(updateStagiaireData.id!, updateStagiaireData); // Modification ici
    setUpdateStagiaireData(null);
  };

  const handleDelete = (id: number): void => deleteStagiaire(id);

  return (
    <div>
      <h2>Liste des Stagiaires</h2>
      <ul>
        {stagiaires.map((stagiaire) => (
          <li key={stagiaire.id}>
            {stagiaire.name} - {stagiaire.email}
            <button onClick={() => handleDelete(stagiaire.id)}>Supprimer</button>
            <button onClick={() => handleUpdate(stagiaire)}>Modifier</button>
          </li>
        ))}
      </ul>

      {updateStagiaireData && (
        <div>
          <h3>Modifier Stagiaire</h3>
          <label>
            Nom:
            <input
              type="text"
              value={updateStagiaireData.name}
              onChange={(e) =>
                setUpdateStagiaireData({
                  ...updateStagiaireData,
                  name: e.target.value,
                })
              }
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="text"
              value={updateStagiaireData.email}
              onChange={(e) =>
                setUpdateStagiaireData({
                  ...updateStagiaireData,
                  email: e.target.value,
                })
              }
            />
          </label>
          <br />
          <button onClick={() => handleUpdateSubmit()}>Modifier</button>
        </div>
      )}
    </div>
  );
};

export default StagiairesList;
