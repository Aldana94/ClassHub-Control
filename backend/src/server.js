require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
  })
  .catch((error) => {
    console.error('Error de conexión a la base de datos:', error);
  });

const userController = require('./controllers/userController');
const classController = require('./controllers/classController');
const attendanceController = require('./controllers/attendanceController');
const emailController = require('./controllers/emailController');
const invitadoController = require('./controllers/invitadoController');

const User = require('./models/User');

// Rutas para los invitados
app.post('/invitados', invitadoController.registrarInvitado);

// User routes
app.post('/users', userController.createUser);
app.get('/users', userController.getAllUsers);
app.get('/usersByRole', userController.getUsersByRole);
app.get('/users/:userId', userController.getUserById);
app.put('/users/:userId', userController.updateUser);
app.delete('/users/:userId', userController.deleteUser);

// Attendance routes
app.post('/users/:userId/attendance', userController.markAttendance);
app.post('/users/:userId/attendance/:classId', attendanceController.registerAttendance);
app.get('/attendance/stats', attendanceController.getAttendanceStats);

// Class routes
app.post('/classes', classController.createClass);
app.get('/classes', classController.getAllClasses);
app.get('/classes/:classId', classController.getClassById);
app.get('/classes/:classId/students', classController.getStudentsByClassId);
app.post('/classes/replicate', classController.replicateClass);
app.post('/classes/:classId/toggleActive', classController.toggleClassActive);

app.post('/attendance', attendanceController.registerAttendance);

// Email route
app.post('/send-email', (req, res) => {
    const { email, subject, body } = req.body;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: body,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo electrónico:', error);
            res.status(500).send('Error al enviar el correo electrónico');
        } else {
            console.log('Correo electrónico enviado: ' + info.response);
            res.send('Correo electrónico enviado correctamente');
        }
    });
});


// Endpoint para inicio de sesión
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Buscar el usuario por nombre de usuario en la base de datos
        const user = await User.findOne({ username });

        // Verificar si el usuario existe y la contraseña coincide
        if (user && user.password === password) {
            // Si las credenciales son válidas, responder con un mensaje de éxito y los datos del usuario
            res.status(200).json({ message: 'Inicio de sesión exitoso', user });
        } else {
            // Si las credenciales son inválidas, responder con un mensaje de error
            res.status(401).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
        // Si hay un error durante el inicio de sesión, responder con un mensaje de error
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ message: 'Error en el inicio de sesión' });
    }
});


const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
