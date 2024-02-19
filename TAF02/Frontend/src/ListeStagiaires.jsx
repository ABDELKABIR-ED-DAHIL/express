import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [stagiaires, setStagiaires] = useState([]);
  const [newStagiaire, setNewStagiaire] = useState({ name: "", email: "" });
  const [editMode, setEditMode] = useState(false);
  const [editStagiaireData, setEditStagiaireData] = useState({ id: null, name: "", email: "" });
  
  useEffect(() => {
    fetchStagiaires();
  }, []);

  const fetchStagiaires = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/stagiaires");
      setStagiaires(response.data);
    } catch (error) {
      console.error("Error fetching stagiaires:", error.message);
    }
  };

  const ajouterStagiaire = async () => {
    try {
      await axios.post("http://localhost:3001/api/stagiaires", newStagiaire);
      fetchStagiaires();
      setNewStagiaire({ name: "", email: "" });
    } catch (error) {
      console.error("Error adding new intern:", error.message);
    }
  };

  const handleNewStagiaireChange = (event) => {
    const { name, value } = event.target;
    setNewStagiaire({ ...newStagiaire, [name]: value });
  };

  const editStagiaire = (stagiaire) => {
    setEditMode(true);
    setEditStagiaireData({ id: stagiaire.id, name: stagiaire.name, email: stagiaire.email });
  };

  const updateStagiaire = async () => {
    try {
      await axios.put(`http://localhost:3001/api/stagiaires/${editStagiaireData.id}`, editStagiaireData);
      setEditMode(false);
      setEditStagiaireData({ id: null, name: "", email: "" });
      fetchStagiaires();
    } catch (error) {
      console.error("Error updating intern:", error.message);
    }
  };

  const deleteStagiaire = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/stagiaires/${id}`);
      fetchStagiaires();
    } catch (error) {
      console.error("Error deleting intern:", error.message);
    }
  };



  return (
    <div>

      <h2>les Stagiaires</h2>
      <input
        type="text"
        placeholder="Nom"
        value={newStagiaire.name}
        onChange={handleNewStagiaireChange}
        name="name"
      />
      <input
        type="email"
        placeholder="Email"
        value={newStagiaire.email}
        onChange={(e) => setNewStagiaire({ ...newStagiaire, email: e.target.value })}
        name="email"
      />
      <button onClick={ajouterStagiaire}>Ajouter Stagiaire</button>
      <ul>
        {stagiaires.map((stagiaire) => (
          <li key={stagiaire.id}>
            {stagiaire.name} - {stagiaire.email}
            <button onClick={() => editStagiaire(stagiaire)}>Edit</button>
            <button onClick={() => deleteStagiaire(stagiaire.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editMode && (
        <div>
          <h2>Edit Stagiaire</h2>
          <input
            type="text"
            placeholder="Nom"
            value={editStagiaireData.name}
            onChange={(e) => setEditStagiaireData({ ...editStagiaireData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={editStagiaireData.email}
            onChange={(e) => setEditStagiaireData({ ...editStagiaireData, email: e.target.value })}
          />
          <button onClick={updateStagiaire}>Update</button>
        </div>
      )}
    </div>
  );
};

export default App;
