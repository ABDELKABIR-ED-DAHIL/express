import React, { useEffect, useState } from "react";
import AddStagiaireForm from "./AddStagiaireForm";
import Axios from "./api";
import StagiairesList from "./StagiairesList";
import Stagiaire from "./Stagiaire";

function App() {
  const [stagiaires, setStagiaires] = useState<Stagiaire[]>([]);

  const getStagiaires = async (): Promise<void> => {
    try {
      const response = await Axios.get<Stagiaire[]>("/stagiaires");
      setStagiaires(response.data);
    } catch (error) {
      alert("Error fetching stagiaires");
    }
  };

  const addStagiaire = async (newStagiaire: Stagiaire): Promise<void> => {
    try {
      const { data }: any = await Axios.post("/stagiaires", newStagiaire);
      setStagiaires([...stagiaires, data]);
    } catch (error) {
      alert("Error adding stagiaire");
    }
  };

  const deleteStagiaire: (id: number) => Promise<void> = async (id) => {
    await Axios.delete(`/stagiaires/${id}`)
      .then(() => {
        setStagiaires((prev) => prev.filter((stagiaire) => stagiaire.id !== id));
      })
      .catch(() => alert(`Error deleting stagiaire with id ${id}`));
  };

  const updateStagiaire = (id: number, updatedStagiaire: Stagiaire) => {
    Axios.put(`/stagiaires/${id}`, updatedStagiaire)
      .then(() => {
        setStagiaires((prev) =>
          prev.map((stagiaire) =>
            stagiaire.id === id
              ? {
                  ...stagiaire,
                  name: updatedStagiaire.name,
                  email: updatedStagiaire.email,
                }
              : stagiaire
          )
        );
      })
      .catch(() => alert(`Error updating stagiaire with id ${id}`));
  };

  useEffect(() => {
    getStagiaires();
  }, []);

  return (
    <>
      <AddStagiaireForm addStagiaire={addStagiaire} stagiaires={[]} />
      <StagiairesList
        stagiaires={stagiaires}
        deleteStagiaire={deleteStagiaire}
        updateStagiaire={updateStagiaire}
      />
    </>
  );
}

export default App;
