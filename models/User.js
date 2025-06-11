const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  saldo: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
