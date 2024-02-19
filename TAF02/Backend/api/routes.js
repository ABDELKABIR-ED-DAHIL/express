import express from "express";
import  Stagiaires  from "./stagiaires.js";

export const router = express.Router();

// router.get("/", (req, res) => {
//   res.json(Stagiaires);
// });

router.get("/", (req, res) => {
  if (req.query.name) {
    const stagiaireNa = Stagiaires.find((st) => st.name === req.query.name);
    if (!stagiaireNa)
      return res.status(404).send("Le stagiaire est introuvable.");
    res.json(stagiaireNa);
  } else {
    res.json(Stagiaires);
  }
});

router.get("/email", (req, res) => {
    const stg_Gmail = Stagiaires.filter((stg) => stg.email.endsWith("gmail.com"));
    res.json(stg_Gmail);
  });

router.get("/:id", (req, res) => {
  const exist = Stagiaires.some((stg) => stg.id === parseInt(req.params.id));
  if (exist) {
    res.json(Stagiaires.filter((stg) => stg.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: "The stagiaire with the id does not exist." });
  }
});

router.post("/", (req, res) => {
  const newStg = {
    id: Date.now(),
    name: req.body.name,
    email: req.body.email,
  };
  if (!newStg.name || !newStg.email) {
    return res.status(400).json({ msg: "entrer name et email" });
  }
  Stagiaires.push(newStg);
  res.json(Stagiaires);
});

router.put("/:id", (req, res) => {
  const exist = Stagiaires.some((stg) => stg.id === parseInt(req.params.id));
  if (exist) {
    const updateStg = req.body;
    Stagiaires.forEach((stag) => {
      if (stag.id === parseInt(req.params.id)) {
        stag.name = updateStg.name ? updateStg.name : stag.name;
        stag.email = updateStg.email ? updateStg.email : stag.email;
        res.json({ msg: "stagiaire modifier", stag });
      }
    });
  } else {
    res.status(400).json({ msg: "le stagiaire n'existe pas" });
  }
});

router.delete("/:id", (req, res) => {
  const index = Stagiaires.findIndex(
    (stg) => stg.id === parseInt(req.params.id)
  );
  if (index !== -1) {
    res.json({
      msg: `Le stagiaire d'id ${req.params.id} a été supprimé`,
      Stagiaires: Stagiaires.filter(
        (stg) => stg.id !== parseInt(req.params.id)
      ),
    });
    Stagiaires.splice(index, 1);
  } else {
    res.status(400).json({ msg: "le stagiaire n'existe pas" });
  }
});


router.get("/name/:name", (req, res) => {
    const stgByName = Stagiaires.filter(
      (stg) => stg.name.toLowerCase() === req.params.name.toLowerCase()
    );
  
    if (stgByName.length > 0) {
      res.json(stgByName);
    } else {
      res.status(404).json({ msg: "No stagiaire found with the given name." });
    }
  });