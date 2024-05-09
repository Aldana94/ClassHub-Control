import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CrearClaseForm from '../components/CrearClaseForm';

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* Esto separa el título y el botón en extremos opuestos */
  margin-bottom: 20px; /* Espacio antes del filtro */
`;

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow-y: auto;
  height: calc(100vh - 40px);
`;

const Table = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }
  th {
    background-color: #007bff;
    color: white;
  }
  td {
    background-color: #f9f9f9;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  margin: 8px;
  border-radius: 5px;
  border: none;
  background-color: ${props => props.variant === 'primary' ? '#007bff' : '#dc3545'};
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.variant === 'primary' ? '#0056b3' : '#c82333'};
  }
`;

const Input = styled.input`
  padding: 8px;
  margin-right: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    padding: 8px 16px;
    margin: 0 4px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

function ClaseList() {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [classesPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const response = await fetch('http://localhost:5002/classes');
    const data = await response.json();
    setClasses(data);
    setFilteredClasses(data);
  };

  useEffect(() => {
    const filteredData = classes.filter(clase =>
      clase.name.toLowerCase().includes(searchName.toLowerCase()) || searchName === ''
    );
    setFilteredClasses(filteredData);
    setCurrentPage(1); // Reset to first page
  }, [searchName, classes]);

  const toggleClassActive = async (id, isActive) => {
    await fetch(`http://localhost:5002/classes/${id}/toggleActive`, {
      method: 'POST'
    });
    fetchClasses();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Fecha no disponible";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Fecha inválida";
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    return date.toLocaleDateString('en-US', options).replace(/,/g, '');
  };

  const indexOfLastClass = currentPage * classesPerPage;
  const indexOfFirstClass = indexOfLastClass - classesPerPage;
  const currentClasses = filteredClasses.slice(indexOfFirstClass, indexOfLastClass);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      {showForm && <CrearClaseForm onClose={() => setShowForm(false)} />}
      <TitleContainer>
        <h1>Lista de Clases</h1>
        <Button onClick={() => setShowForm(true)} variant="primary">Crear Nueva Clase</Button>
      </TitleContainer>
      <div>
        <Input type="text" placeholder="Buscar por nombre..." value={searchName} onChange={e => setSearchName(e.target.value)} />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Inicio</th>
            <th>Final</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentClasses.map(clase => (
            <tr key={clase._id}>
              <td>{clase.name}</td>
              <td>{formatDate(clase.date)}</td>
              <td>{formatDate(clase.end)}</td>
              <td>
                <Button onClick={() => toggleClassActive(clase._id, clase.isActive)} variant={clase.isActive ? 'danger' : 'primary'}>
                  {clase.isActive ? 'Inactivar' : 'Activar'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {Array.from({ length: Math.ceil(filteredClasses.length / classesPerPage) }, (_, i) => i + 1).map(number => (
          <button key={number} onClick={() => paginate(number)}>
            {number}
          </button>
        ))}
      </Pagination>
    </Container>
  );
}

export default ClaseList;
