import express from 'express';
import authMiddleware from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Ruta protegida para obtener los datos del usuario
router.get('/datos', authMiddleware, async (req, res) => {
  try {
    const usuario = await User.findById(req.usuario.id).select('-password');
    res.json(usuario);
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    res.status(500).json({ mensaje: 'Error al obtener datos del usuario' });
  }
});

export default router;
