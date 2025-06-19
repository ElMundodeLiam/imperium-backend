import express from 'express';
import auth from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Ruta protegida para obtener datos del usuario
router.get('/datos', auth, async (req, res) => {
  try {
    const usuario = await User.findById(req.usuario.id).select('-password');

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json({
      nombre: usuario.nombre,
      saldo: usuario.saldo
    });
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

export default router;
