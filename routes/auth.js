import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
  const { nombre, correo, password } = req.body;

  try {
    let usuario = await User.findOne({ correo });
    if (usuario) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    const nuevoUsuario = new User({ nombre, correo, password });

    const salt = await bcrypt.genSalt(10);
    nuevoUsuario.password = await bcrypt.hash(password, salt);

    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  const { correo, password } = req.body;

  try {
    const usuario = await User.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }

    const esMatch = await bcrypt.compare(password, usuario.password);
    if (!esMatch) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

export default router;
