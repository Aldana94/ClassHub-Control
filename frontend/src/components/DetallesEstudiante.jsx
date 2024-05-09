import React from 'react';
import styled from 'styled-components';

const DetallesEstudiante = ({ student, handleCloseDetails }) => {
  return (
    <Container>
      <Content>
        <CloseButton onClick={handleCloseDetails}>X</CloseButton>
        <h2>Detalles del Estudiante</h2>
        <Detail>
          <strong>Nombre:</strong> {student.nombre}
        </Detail>
        <Detail>
          <strong>Apellido:</strong> {student.apellido}
        </Detail>
        <Detail>
          <strong>Identificación:</strong> {student.identificacion}
        </Detail>
        <Detail>
          <strong>Grado de Cinturón:</strong> {student.gradoCinturon}
        </Detail>
        <Detail>
          <strong>Email:</strong> {student.email}
        </Detail>
        <Detail>
          <strong>Contacto:</strong> {student.contacto}
        </Detail>
        <Detail>
          <strong>Fecha de Nacimiento:</strong> {new Date(student.fechaNacimiento).toLocaleDateString()}
        </Detail>
        <Detail>
          <strong>EPS:</strong> {student.eps}
        </Detail>
        {/* Agrega más detalles aquí según sea necesario */}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo semi-transparente para oscurecer el fondo */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative; /* Permitir posicionar el botón de cerrar absolutamente */
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  font-size: 1rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: red; /* Color rojo */
  transition: color 0.3s ease;

  &:hover {
    color: darkred; /* Color rojo oscuro al pasar el ratón */
  }
`;

const Detail = styled.p`
  margin-bottom: 10px;
`;

export default DetallesEstudiante;
