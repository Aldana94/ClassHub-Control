import React from 'react';
import styled from 'styled-components';
import ClaseList from '../components/ClaseList'; // Asegúrate de que la ruta de importación sea correcta

export function Diagramas() {
  return (
    <Container>
      <Title>Administración de Clases</Title>
      <ClaseList />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
`;

export default Diagramas;
