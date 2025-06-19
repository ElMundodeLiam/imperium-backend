import express from 'express';
import authMiddleware from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Obtener datos del usuario autenticado (name y balance)
router.get("/datos", authMiddleware, async (req, res) => {
  try {
    const usuario = await User.findById(req.usuario.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.json({
      name: usuario.name, // Este es el campo correcto según tu base de datos
      balance: usuario.balance // Este también es el campo correcto
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener datos del usuario" });
  }
});
// Ruta temporal para ver usuarios y sus IDs (eliminar después)

router.get('/todos', async (req, res) => {
  try {
    const usuarios = await User.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener usuarios" });
  }
});
export default router;
