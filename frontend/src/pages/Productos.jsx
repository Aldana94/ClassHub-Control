import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import VerAlumnos from '../components/VerAlumnos';
import CrearAlumno from '../components/CrearAlumno';
import CrearInvitado from '../components/CrearInvitado';
import DetallesEstudiante from '../components/DetallesEstudiante';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Productos() {
  const [students, setStudents] = useState([]);
  const [menuOption, setMenuOption] = useState('verAlumnos');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchStudents();
    fetchClasses();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5002/users');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error al obtener la lista de estudiantes:', error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await fetch('http://localhost:5002/classes');
      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error('Error al obtener la lista de clases:', error);
    }
  };

  const handleSave = async (formData) => {
    try {
      const response = await fetch('http://localhost:5002/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        // Actualizar la lista de estudiantes después de guardar
        fetchStudents();
        
      } else {
        console.error('Error al crear el estudiante:', response.status);
        toast.error('Error al crear el estudiante');
      }
    } catch (error) {
      console.error('Error al crear el estudiante:', error);
      toast.error('Error al crear el estudiante');
    }
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
  };

  const handleCloseDetails = () => {
    setSelectedStudent(null);
  };

  const renderMenuOption = () => {
  switch (menuOption) {
    case 'verAlumnos':
      return (
        <VerAlumnos
          students={students}
          handleViewDetails={handleViewDetails}
          classes={classes.filter((clase) => new Date(clase.start) < new Date() && new Date(clase.end) > new Date())} // Filtrar clases activas
        />
      );
    case 'crearAlumno':
      return <CrearAlumno handleSave={handleSave} />;
    case 'crearInvitado':
      return <CrearInvitado />;
    default:
      return null;
  }
};

  return (
    <Container>
      <Header>
        <h1>Productos</h1>
        <Menu>
          <MenuItem
            active={menuOption === 'verAlumnos'}
            onClick={() => setMenuOption('verAlumnos')}
          >
            Ver Alumnos
          </MenuItem>
          <MenuItem
            active={menuOption === 'crearAlumno'}
            onClick={() => setMenuOption('crearAlumno')}
          >
            Crear Alumno
          </MenuItem>
          <MenuItem
            active={menuOption === 'crearInvitado'}
            onClick={() => setMenuOption('crearInvitado')}
          >
            Crear Invitado
          </MenuItem>
        </Menu>
      </Header>
      {renderMenuOption()}
      {selectedStudent && (
        <DetallesEstudiante
          student={selectedStudent}
          handleCloseDetails={handleCloseDetails}
        />
      )}
      <ToastContainer />
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Menu = styled.div`
  display: flex;
`;

const MenuItem = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: ${(props) => (props.active ? '#007bff' : 'transparent')};
  color: ${(props) => (props.active ? '#fff' : '#333')};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s ease, color 0.3s ease;
  &:hover {
    background-color: ${(props) => (!props.active ? '#f4f4f4' : '#007bff')};
    color: ${(props) => (!props.active ? '#007bff' : '#fff')};
  }
`;

export default Productos;
