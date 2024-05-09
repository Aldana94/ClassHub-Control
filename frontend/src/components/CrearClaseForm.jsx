import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 500px;
  z-index: 1051;
  position: relative;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`;

const StyledForm = styled.form`
  width: 100%;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 1rem;
  color: #666;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const SuccessMessage = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: #28a745;
  color: #fff;
  border-radius: 5px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 8px 12px;
  font-size: 1rem;
  background-color: transparent;
  color: #999;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #666;
  }
`;

function CrearClaseForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    start: '',
    end: '',
    replication: {
      days: [],
      frequency: '',
      count: ''
    },
    successMessage: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Convertir fecha UTC a UTC-5 para mostrar en la interfaz
  const convertDateToUTC5 = (isoDate) => {
    if (!isoDate) {
        // Retorna un valor por defecto o vacío si la fecha no es válida
        return "";
    }

    const date = new Date(isoDate);
    // Verifica si la fecha es inválida
    if (isNaN(date.getTime())) {
        return "";
    }

    return new Date(date.getTime() - (5 * 60 * 60 * 1000)).toISOString().slice(0, 16);
};

  const handleReplicationChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      replication: {
        ...prevState.replication,
        [name]: value
      }
    }));
  };

  const handleDaysChange = (e) => {
    const { options } = e.target;
    const selectedDays = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedDays.push(options[i].value);
      }
    }
    setFormData(prevState => ({
      ...prevState,
      replication: {
        ...prevState.replication,
        days: selectedDays
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, start, end, replication } = formData;

    // Formatea las fechas en formato local ISO sin convertir a UTC
    const formatLocalISO = (dateString) => {
        const [date, time] = dateString.split('T');
        const [hours, minutes] = time.split(':');
        return `${date}T${hours}:${minutes}:00`; // Asume que los minutos se manejan y se omiten los segundos
    };

    const localStart = formatLocalISO(start);
    const localEnd = formatLocalISO(end);

    const response = await fetch('http://localhost:5002/classes/replicate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        start: localStart,
        end: localEnd,
        replication: {
          days: replication.days,
          count: replication.count
        },
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setFormData((prevState) => ({
        ...prevState,
        successMessage: '¡Clase creada exitosamente!',
      }));
      setTimeout(() => onClose(), 3000);
    } else {
      console.error('Error al crear la clase');
    }
};


  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Title>Crear Clase</Title>
        <StyledForm onSubmit={handleSubmit}>
          <InputContainer>
            <InputLabel>Nombre de la Clase</InputLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre de la Clase"
              required
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>Fecha y Hora de Inicio</InputLabel>
            <Input
  type="datetime-local"
  name="start"
  value={formData.start ? convertDateToUTC5(formData.start) : ""}
  onChange={handleChange}
  required
/>

<Input
  type="datetime-local"
  name="end"
  value={formData.end ? convertDateToUTC5(formData.end) : ""}
  onChange={handleChange}
  required
/>
          </InputContainer>
          <InputContainer>
            <InputLabel>Replicar por Días</InputLabel>
            <StyledSelect
              name="days"
              value={formData.replication.days}
              onChange={handleDaysChange}
              multiple
            >
              <option value="Monday">Lunes</option>
              <option value="Tuesday">Martes</option>
              <option value="Wednesday">Miércoles</option>
              <option value="Thursday">Jueves</option>
              <option value="Friday">Viernes</option>
              <option value="Saturday">Sábado</option>
              <option value="Sunday">Domingo</option>
            </StyledSelect>
          </InputContainer>
          <InputContainer>
            <InputLabel>Replicar por Semanas</InputLabel>
            <Input
              type="number"
              name="count"
              value={formData.replication.count}
              onChange={handleReplicationChange}
              min="1"
              placeholder="Número de semanas"
              required
            />
          </InputContainer>
          <SubmitButton type="submit">Crear</SubmitButton>
        </StyledForm>
        {formData.successMessage && <SuccessMessage>{formData.successMessage}</SuccessMessage>}
        <CloseButton onClick={onClose}>Cerrar</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
}

export default CrearClaseForm;
