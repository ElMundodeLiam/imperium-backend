const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware para verificar token
function verificarToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ mensaje: 'Acceso denegado' });

  try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = verificado;
    next();
  } catch (err) {
    res.status(400).json({ mensaje: 'Token inválido' });
  }
}

// Obtener perfil del usuario
router.get('/perfil', verificarToken, async (req, res) => {
  try {
    const usuario = await User.findById(req.usuario.id).select('-contraseña');
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener perfil', error: err });
  }
});

module.exports = router;
