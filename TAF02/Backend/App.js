import express from 'express'
import cors from 'cors'
import { router } from './api/routes.js';
const PORT = 3001
const app= express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use('/api/stagiaires',router)
 
app.listen(PORT, () => { 
    console.log(`Serveur démarré on port ${PORT}`); 
});