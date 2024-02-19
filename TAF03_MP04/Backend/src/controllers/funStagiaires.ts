import  Stagiaire  from "../models/Stagiaire";
import { Stagiaires } from "../models/Stagiaires";

export const getStagiaires = (): Stagiaire[] => Stagiaires;

export const getStagiaireById = (id: number): Stagiaire | undefined => {
  const stagiaire = Stagiaires.find((stagiaire) => stagiaire.id === id);
  return stagiaire;
};

export const addStagiaire = (stagiaire: Stagiaire) => {
  Stagiaires.push(stagiaire);
  return Stagiaires;
};

export const deleteStagiaire = (id: number) => {
  const index = Stagiaires.findIndex((stagiaire) => stagiaire.id === id);
  if (index !== -1) {
    return Stagiaires.splice(index, 1);
  }
};

export const updateStagiaire = (id: number, updatedStagiaire: Stagiaire) => {
  const index = Stagiaires.findIndex((stagiaire) => stagiaire.id === id);
  if (index !== -1) {
    Stagiaires[index] = updatedStagiaire;
    return Stagiaires;
  }
  return null;
};
