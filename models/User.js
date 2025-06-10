const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  contraseña: {
    type: String,
    required: true
  },
  saldo: {
    type: Number,
    default: 1000
  }
});

module.exports = mongoose.model('User', UserSchema);
