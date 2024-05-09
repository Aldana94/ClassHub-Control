const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true },
  identificacion: { type: String, required: true },
  eps: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
  edad: { type: Number }, // Campo para almacenar la edad
  acudiente: { type: String }, // Hacer el campo acudiente opcional
  gradoCinturon: { type: String }, // Campo para grado de cinturón
  fotoPerfil: { type: String }, // Campo para URL de la foto de perfil
  fechaInscripcion: { type: Date }, // Campo para fecha de inscripción
  contacto: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  attendance: [{ date: { type: Date, default: Date.now } }]
});

// Antes de guardar, calcular la edad y actualizar el campo correspondiente
userSchema.pre('save', function(next) {
  const today = new Date();
  const birthDate = new Date(this.fechaNacimiento);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  this.edad = age;

  // Hacer el campo acudiente opcional dependiendo de la edad
  if (this.edad >= 18) {
    this.acudiente = undefined; // Si es mayor de 18, no se requiere acudiente
  }

  next();
});



const User = mongoose.model('User', userSchema);

module.exports = User;
