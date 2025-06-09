import express from 'express';
import cors from 'cors';
import { connectToDatabase, closeDatabaseConnection } from './utils/DB.js'; 
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import torneoPostRoutes from './routes/torneoPostRoutes.js';
import answerRoutes from './routes/answerRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import pokemonRoutes from './routes/pokemonRoutes.js';


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

connectToDatabase()
  .then(() => {
    console.log('Base de datos conectada correctamente');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1); // Termina el proceso si la conexión falla
  });


// API endpoints
app.use('/api', userRoutes);
app.use('/api/pokemon', pokemonRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/postsTorneo', torneoPostRoutes);
app.use('/api/Answers', answerRoutes);
app.use('/api/teams', teamRoutes);


app.get('/', (_req, res) => {
  res.send('PokeBuilder Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});