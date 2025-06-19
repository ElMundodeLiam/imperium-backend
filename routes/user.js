import express from 'express';
import authMiddleware from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Ruta para obtener datos del usuario autenticado
router.get("/datos", authMiddleware, async (req, res) => {
  try {
    const usuario = await User.findById(req.usuario.id).select("name balance");

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.json({
      name: usuario.name,
      balance: usuario.balance
    });
  } catch (error) {
    console.error("Error al obtener datos del usuario:", error);
    res.status(500).json({ mensaje: "Error al obtener datos del usuario" });
  }
});

export default router;
