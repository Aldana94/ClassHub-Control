const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendEmail = async (req, res) => {
  const { email, username, password } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Credenciales de acceso a Seishin Dojo',
    text: `¡Bienvenido a Seishin Dojo!\n\nTus credenciales de acceso son:\n\nUsuario: ${username}\nContraseña: ${password}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado: ' + info.response);
    res.status(200).json({ message: 'Correo electrónico enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    res.status(500).json({ message: 'Error al enviar el correo electrónico' });
  }
};