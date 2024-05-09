const Class = require('../models/Class');
const Attendance = require('../models/Attendance');

// Controlador para crear una clase
exports.createClass = async (req, res) => {
  try {
    const { name, start, end } = req.body;
    const newClass = new Class({
      name,
      start: start, // Usa directamente la cadena recibida para fecha de inicio
      end: end, // Usa directamente la cadena recibida para fecha de finalización
      isActive: true
    });
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controlador para obtener todas las clases
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener la información de una clase por su ID
exports.getClassById = async (req, res) => {
  try {
    const classId = req.params.classId;
    const clase = await Class.findById(classId);
    if (!clase) {
      return res.status(404).json({ message: 'Clase no encontrada' });
    }
    res.json(clase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener los estudiantes registrados para una clase específica
exports.getStudentsByClassId = async (req, res) => {
  try {
    const classId = req.params.classId;
    const numStudents = await Attendance.countDocuments({ classId });
    res.json({ numStudents });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para replicar una clase
exports.replicateClass = async (req, res) => {
  try {
    const { name, start, end, replication } = req.body;
    const { days, count } = replication;

    // Crea un array para almacenar las clases replicadas
    const replicatedClasses = [];
    const parsedStart = new Date(start);
    const duration = new Date(end).getTime() - parsedStart.getTime();

    for (let i = 0; i < count; i++) {
      for (const day of days) {
        const currentDate = new Date(parsedStart.getTime());
        currentDate.setDate(parsedStart.getDate() + (i * 7) + getDay(day) - parsedStart.getDay());
        const currentEndDate = new Date(currentDate.getTime() + duration);

        const replicatedClass = new Class({
          name,
          schedule: currentDate.toISOString().slice(11, 16),
          date: currentDate.toISOString(), // Mantener formato ISO sin conversión de zona horaria
          end: currentEndDate.toISOString(), // Mantener formato ISO sin conversión de zona horaria
          isActive: true
        });

        await replicatedClass.save();
        replicatedClasses.push(replicatedClass);
      }
    }

    res.status(201).json({ replicatedClasses });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controlador para cambiar el estado de activación de una clase
exports.toggleClassActive = async (req, res) => {
  try {
    const classId = req.params.classId;
    const clase = await Class.findById(classId);
    if (!clase) {
      return res.status(404).json({ message: 'Clase no encontrada' });
    }
    clase.isActive = !clase.isActive;
    await clase.save();
    res.json({ message: `Clase ${clase.isActive ? 'activada' : 'inactivada'}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Función auxiliar para obtener el índice del día de la semana
function getDay(day) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days.indexOf(day);
}
