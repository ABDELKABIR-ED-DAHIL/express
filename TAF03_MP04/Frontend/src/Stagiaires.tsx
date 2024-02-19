import Stagiaire from "./Stagiaire";
interface Stagiaires {
    addStagiaire: (Stagiaire: Stagiaire) => void;
    deleteStagiaire?:(id:number)=>void
    updateStagiaire?:(id:number|null,updateStagiaire:Stagiaire)=>void
    Stagiaires:Stagiaire[]
}

export default Stagiaires;