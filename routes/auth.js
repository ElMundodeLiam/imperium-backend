const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  const { nombre, email, contraseña } = req.body;

  try {
    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ msg: 'El usuario ya existe' });

    const hashed = await bcrypt.hash(contraseña, 10);
    const nuevoUsuario = new User({ nombre, email, contraseña: hashed, saldo: 1000 });
    await nuevoUsuario.save();

    res.status(201).json({ msg: 'Usuario creado' });
  } catch (err) {
    res.status(500).json({ error: 'Error del servidor' });
  }
});

router.post('/login', async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    const usuario = await User.findOne({ email });
    if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado' });

    const esValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esValida) return res.status(401).json({ msg: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '3h' });

    res.json({ token, usuario: { nombre: usuario.nombre, saldo: usuario.saldo } });
  } catch (err) {
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;
