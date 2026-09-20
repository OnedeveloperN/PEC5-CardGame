import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import gameRoutes from './routes/gameRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a Base de Datos
connectDB();

// Rutas API
app.use('/api/games', gameRoutes);

// Ruta de prueba inicial
app.get('/', (req, res) => {
  res.send('API del Juego Mayor o Menor funcionando 🎴');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});