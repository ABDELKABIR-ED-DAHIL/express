import express from "express";
import router  from "./src/routes/routes";
import cors from "cors";
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());
app.use("/todos", router);

app.listen(PORT, () => {
  console.log(`Serveur démarré on port ${PORT}`);
});