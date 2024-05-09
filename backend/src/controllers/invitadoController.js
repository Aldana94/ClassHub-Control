// controllers/invitadoController.js
const Invitado = require('../models/Invitado');

// Controlador para registrar un nuevo invitado
exports.registrarInvitado = async (req, res) => {
  try {
    const { nombre, correo, celular, claseId } = req.body;

    const nuevoInvitado = new Invitado({
      nombre,
      correo,
      celular,
      clase: claseId
    });

    await nuevoInvitado.save();

    res.status(201).json({ message: 'Invitado registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar invitado:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
