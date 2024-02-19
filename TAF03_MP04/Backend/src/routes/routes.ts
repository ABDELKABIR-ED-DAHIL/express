import express from 'express';
import { addStagiaire, deleteStagiaire, getStagiaireById, getStagiaires, updateStagiaire } from '../controllers/funStagiaires';
import Stagiaire from '../models/Stagiaire';

const router = express.Router();

router.get('/', (req, res) => {
    console.log(getStagiaires());
    res.json(getStagiaires());
});

router.post('/', (req, res) => {
    try {
        const userProvidedId = parseInt(req.body.id);
        console.log("User Provided ID:", userProvidedId); // Add this line for debugging
        const Stagiaire: Stagiaire = {
            id: isNaN(userProvidedId) ? Date.now() : userProvidedId,
            name: req.body.name,
            email: req.body.email
        };
        addStagiaire(Stagiaire);
        res.status(201).json(Stagiaire);
    } catch (error) {
        console.error("Error creating Stagiaire:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/:id', (req, res) => {
    res.json(getStagiaireById(parseInt(req.params.id)));
    res.status(201).json({
        "id": req.params.id,
        "message": "Stagiaire found"
    });
});

router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const updatedStagiaire: Stagiaire = {
        id: id,
        name: req.body.name,
        email: req.body.email
    };
    const updated = updateStagiaire(id, updatedStagiaire);
    if (updated) {
        res.json(updated);
    } else {
        res.status(404).send("Stagiaire not found");
    }
});

router.delete("/:id", (req, res) => {
    res.json(deleteStagiaire(parseInt(req.params.id)));
    res.status(201).json("Stagiaire deleted successfully");
});

export default router;