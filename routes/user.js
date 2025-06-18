// backend/routes/user.js
import express from 'express';
import authMiddleware from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Obtener datos del usuario autenticado (nombre y saldo)
router.get("/datos", authMiddleware, async (req, res) => {
  try {
    const usuario = await User.findById(req.usuario.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.json({
      nombre: usuario.nombre,
      saldo: usuario.saldo
    });
  } catch (error) {
    console.error("Error al obtener datos:", error);
    res.status(500).json({ mensaje: "Error al obtener datos del usuario" });
  }
});

export default router;
