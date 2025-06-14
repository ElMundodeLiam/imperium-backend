import express from 'express';
import authMiddleware from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Obtener perfil del usuario autenticado
router.get("/perfil", authMiddleware, async (req, res) => {
  try {
    const usuario = await User.findById(req.usuario.id).select("-password");
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener perfil" });
  }
});

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
    res.status(500).json({ mensaje: "Error al obtener datos del usuario" });
  }
});

export default router;
