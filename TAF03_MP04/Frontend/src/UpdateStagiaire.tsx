import React, { useState } from "react";
import Stagiaire from "./Stagiaire";

interface UpdateStagiaireProps {
  updateStagiaireData: Stagiaire;
  setUpdateStagiaireData: (stagiaire: Stagiaire | null) => void;
  handleUpdateSubmit: (updatedStagiaire: Stagiaire) => void;
}

const UpdateStagiaire: React.FC<UpdateStagiaireProps> = ({
  updateStagiaireData,
  setUpdateStagiaireData,
  handleUpdateSubmit,
}) => {
  const [updatedStagiaire, setUpdatedStagiaire] = useState<Stagiaire>({ ...updateStagiaireData });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedStagiaire({
      ...updatedStagiaire,
      name: e.target.value,
    });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedStagiaire({
      ...updatedStagiaire,
      email: e.target.value,
    });
  };

  const handleCancel = () => {
    setUpdateStagiaireData(null);
  };

  const handleUpdateSubmitLocal = () => {
    handleUpdateSubmit(updatedStagiaire);
    setUpdateStagiaireData(null);
  };

  return (
    <div>
      <h3>Modifier Stagiaire</h3>
      <label>
        Nom:
        <input
          type="text"
          value={updatedStagiaire.name}
          onChange={handleNameChange}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="text"
          value={updatedStagiaire.email}
          onChange={handleEmailChange}
        />
      </label>
      <br />
      <button onClick={handleUpdateSubmitLocal}>Modifier Stagiaire</button>
      <button onClick={handleCancel}>Annuler</button>
    </div>
  );
};

export default UpdateStagiaire;
