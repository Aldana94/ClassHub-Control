import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CrearInvitado = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [celular, setCelular] = useState('');
  const [clasesDisponibles, setClasesDisponibles] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [cortesiasRegistradas, setCortesiasRegistradas] = useState(0);
  const [mensaje, setMensaje] = useState('');

  // Obtener las clases disponibles
  useEffect(() => {
    fetch('http://localhost:5002/classes')
      .then(response => response.json())
      .then(data => {
        const today = new Date();
        const availableClasses = data.filter(cls => {
          const classDate = new Date(cls.date);
          return (
            classDate.getDate() === today.getDate() &&
            classDate.getMonth() === today.getMonth() &&
            classDate.getFullYear() === today.getFullYear() &&
            cls.isActive
          );
        });
        setClasesDisponibles(availableClasses);
      })
      .catch(error => console.error('Error fetching classes:', error));
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    // Verificar si ya se han registrado 3 cortesías para el mismo contacto
    if (cortesiasRegistradas >= 3) {
      setMensaje('No se pueden registrar más de 3 cortesías para el mismo contacto.');
      return;
    }
    // Aquí puedes enviar los datos del formulario a tu servidor
    fetch('http://localhost:5002/invitados', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre,
        correo,
        celular,
        claseId: selectedClass
      })
    })
      .then(response => {
        if (response.ok) {
          setCortesiasRegistradas(cortesiasRegistradas + 1);
          setMensaje('Cortesía registrada con éxito.');
          // Limpia los campos después de enviar el formulario
          setNombre('');
          setCorreo('');
          setCelular('');
          setSelectedClass('');
        } else {
          setMensaje('Error al registrar la cortesía.');
        }
      })
      .catch(error => {
        console.error('Error al registrar la cortesía:', error);
        setMensaje('Error al conectar con el servidor.');
      });
  };

  const handleClassChange = event => {
    setSelectedClass(event.target.value);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h2>Crear Invitado</h2>
      <FormGroup>
        <label htmlFor="nombre">Nombre:</label>
        <StyledInput
          type="text"
          id="nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="correo">Correo:</label>
        <StyledInput
          type="email"
          id="correo"
          value={correo}
          onChange={e => setCorreo(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="celular">Celular:</label>
        <StyledInput
          type="tel"
          id="celular"
          value={celular}
          onChange={e => setCelular(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="clase">Clase Disponible:</label>
        <StyledSelect id="clase" value={selectedClass} onChange={handleClassChange} required>
          <option value="">Seleccionar clase</option>
          {clasesDisponibles.map(cls => (
            <option key={cls._id} value={cls._id}>
              {cls.name}
            </option>
          ))}
        </StyledSelect>
      </FormGroup>
      <SubmitButton type="submit">Registrar</SubmitButton>
      {mensaje && <Mensaje>{mensaje}</Mensaje>}
    </StyledForm>
  );
};

const StyledForm = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #f7f7f7;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

const Mensaje = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #ff0000;
`;

export default CrearInvitado;
