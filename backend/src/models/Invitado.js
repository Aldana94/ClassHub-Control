// models/Invitado.js
const mongoose = require('mongoose');

const invitadoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true
  },
  celular: {
    type: String,
    required: true
  },
  clase: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clase',
    required: true
  }
});

const Invitado = mongoose.model('Invitado', invitadoSchema);

module.exports = Invitado;
