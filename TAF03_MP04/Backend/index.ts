import express from 'express';
import router from './src/routes/routes'; 
const cors = require('cors'); 

const app = express();
app.use(cors()); 

app.use(express.json());

app.use('/stagiaires', router); 

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});