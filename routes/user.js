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
// Ruta temporal para ver usuarios y sus IDs (eliminar después)
import User from '../models/User.js';

router.get('/todos', async (req, res) => {
  try {
    const usuarios = await User.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener usuarios" });
  }
});
export default router;
