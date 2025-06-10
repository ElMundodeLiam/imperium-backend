const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

router.get('/perfil', authMiddleware, async (req, res) => {
  try {
    const usuario = await User.findById(req.usuario.id).select('-contraseña');
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
});

router.post('/apostar', authMiddleware, async (req, res) => {
  const { monto } = req.body;
  try {
    const usuario = await User.findById(req.usuario.id);
    if (usuario.saldo < monto) {
      return res.status(400).json({ msg: 'Saldo insuficiente' });
    }
    usuario.saldo -= monto;
    await usuario.save();
    res.json({ msg: 'Apuesta realizada', saldo: usuario.saldo });
  } catch (err) {
    res.status(500).json({ error: 'Error al procesar apuesta' });
  }
});

router.post('/recargar', authMiddleware, async (req, res) => {
  const { monto } = req.body;
  try {
    const usuario = await User.findById(req.usuario.id);
    usuario.saldo += monto;
    await usuario.save();
    res.json({ msg: 'Saldo recargado', saldo: usuario.saldo });
  } catch (err) {
    res.status(500).json({ error: 'Error al recargar saldo' });
  }
});

module.exports = router;
