import React, { useState } from "react";
import Axios from "./api";

const AddStagiaire: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleAddStagiaire = async () => {
    try {
      const response = await Axios.post("/stagiaires", { name, email });
      console.log("Stagiaire ajouté :", response.data);
      // Réinitialiser les champs après l'ajout
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Erreur lors de l'ajout du stagiaire :", error);
    }
  };

  return (
    <div>
      <h2>Ajouter un stagiaire</h2>
      <div>
        <label>
          Nom :
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Email :
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleAddStagiaire}>Ajouter Stagiaire</button>
    </div>
  );
};

export default AddStagiaire;
