const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registro
router.post('/register', async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body;

    const existe = await User.findOne({ correo });
    if (existe) return res.status(400).json({ mensaje: 'Correo ya registrado' });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(contraseña, salt);

    const nuevoUsuario = new User({ nombre, correo, contraseña: hash });
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error en el servidor', error: err });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const usuario = await User.findOne({ correo });
    if (!usuario) return res.status(400).json({ mensaje: 'Correo no encontrado' });

    const esValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esValida) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ mensaje: 'Login exitoso', token });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error: err });
  }
});

module.exports = router;
