// Configuracion.jsx
import React, { useState } from 'react';
import styled from 'styled-components';

function Configuracion() {
  const [title, setTitle] = useState('Organización Seishin Dojo'); // Estado para el título
  const [logo, setLogo] = useState('ruta/a/la/imagen'); // Estado para el logo

  // Función para manejar cambios en el título
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // Función para manejar cambios en el logo
  const handleLogoChange = (event) => {
    setLogo(event.target.value);
  };

  return (
    <Container>
      <h1>Configuraciones</h1>
      <ConfigItem>
        <label>Título:</label>
        <input type="text" value={title} onChange={handleTitleChange} />
      </ConfigItem>
      <ConfigItem>
        <label>Logo:</label>
        <input type="text" value={logo} onChange={handleLogoChange} />
      </ConfigItem>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
`;

const ConfigItem = styled.div`
  margin-bottom: 10px;
  label {
    margin-right: 10px;
  }
  input {
    width: 300px;
    padding: 5px;
    font-size: 16px;
  }
`;

export default Configuracion;
