import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CredencialesPopup from './CredencialesPopup';

const CrearAlumno = ({ handleSave }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    identificacion: '',
    eps: '',
    fechaNacimiento: '',
    acudiente: '',
    gradoCinturon: '10Kyu',
    fotoPerfil: '',
    fechaInscripcion: '',
    contacto: '',
    role: 'user',
  });

  const [showCredentialsPopup, setShowCredentialsPopup] = useState(false);
  const [credentialsPopupData, setCredentialsPopupData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = formData.email;
    const password = formData.identificacion;
    handleSave({ ...formData, username, password });
    toast.success('¡Alumno creado correctamente!');
    setCredentialsPopupData({ username, password });
    setShowCredentialsPopup(true);
    setFormData({
      nombre: '',
      apellido: '',
      email: '',
      identificacion: '',
      eps: '',
      fechaNacimiento: '',
      acudiente: '',
      gradoCinturon: '10Kyu',
      fotoPerfil: '',
      fechaInscripcion: '',
      contacto: '',
      role: 'user',
    });

    // Envío de correo electrónico al crear un nuevo alumno
    try {
      await fetch('http://localhost:5002/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          subject: 'Bienvenido a Seishin Dojo',
          body: `¡Bienvenido a Seishin Dojo!\n\nTus credenciales de acceso son:\n\nUsuario: ${username}\nContraseña: ${password}`,
        }),
      });
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
    }
  };

  const handleCloseCredentialsPopup = () => {
    setShowCredentialsPopup(false);
  };

    
  return (
    <Wrapper>
      <Title>Crear Alumno</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Nombre:</Label>
          <Input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Apellido:</Label>
          <Input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Email:</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Identificación:</Label>
          <Input
            type="text"
            name="identificacion"
            value={formData.identificacion}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>EPS:</Label>
          <Input
            type="text"
            name="eps"
            value={formData.eps}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Fecha de Nacimiento:</Label>
          <Input
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Acudiente:</Label>
          <Input
            type="text"
            name="acudiente"
            value={formData.acudiente}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Grado de Cinturón:</Label>
          <Select
            name="gradoCinturon"
            value={formData.gradoCinturon}
            onChange={handleChange}
            required
          >
            <option value="1Kyu">1Kyu</option>
            <option value="2Kyu">2Kyu</option>
            <option value="3Kyu">3Kyu</option>
            <option value="4Kyu">4Kyu</option>
            <option value="5Kyu">5Kyu</option>
            <option value="6Kyu">6Kyu</option>
            <option value="7Kyu">7Kyu</option>
            <option value="8Kyu">8Kyu</option>
            <option value="9Kyu">9Kyu</option>
            <option value="10Kyu">10Kyu</option>
            <option value="1Dan">1Dan</option>
            <option value="2Dan">2Dan</option>
            <option value="3Dan">3Dan</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Foto de Perfil (URL):</Label>
          <Input
            type="url"
            name="fotoPerfil"
            value={formData.fotoPerfil}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Fecha de Inscripción:</Label>
          <Input
            type="date"
            name="fechaInscripcion"
            value={formData.fechaInscripcion}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Contacto:</Label>
          <Input
            type="tel"
            name="contacto"
            value={formData.contacto}
            onChange={handleChange}
            required
          />
        </FormGroup>
        {/* Eliminados los campos de Username y Password del formulario */}
        <FormGroup>
          <Label>Rol:</Label>
          <Select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
            {/* Agrega otras opciones de roles si es necesario */}
          </Select>
        </FormGroup>
        <SubmitButton type="submit">Guardar</SubmitButton>
      </Form>
      {showCredentialsPopup && (
        <CredencialesPopup
          username={credentialsPopupData.username}
          password={credentialsPopupData.password}
          onClose={handleCloseCredentialsPopup}
          //onSendEmail={handleSendEmail} // Pasa handleSendEmail como prop
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  /* Estilos del formulario */
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

export default CrearAlumno;
