import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
// Ruta de prueba
app.get('/', (req, res) => {
  res.send('IMPERIUM CASINO backend funcionando');
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB conectado');
  app.listen(process.env.PORT || 5000, () => {
    console.log('Servidor backend corriendo');
  });
})
.catch(err => console.log('Error al conectar MongoDB:', err));
