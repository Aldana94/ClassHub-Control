import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditarEstudiante = ({ student, handleEdit, handleCancelEdit }) => {
  const [editedStudent, setEditedStudent] = useState({ ...student });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEdit({ ...editedStudent, _id: student._id });
    toast.success('¡Estudiante actualizado correctamente!');
    setEditedStudent({ ...student }); // Restablecer el estado al estado original
  };

  const handleCancel = () => {
    setEditedStudent({ ...student }); // Restablecer el estado al estado original
    handleCancelEdit();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <CloseButton onClick={handleCancel}>X</CloseButton>
      <Row>
        <Column>
          <Label>Nombre:</Label>
          <Input
            type="text"
            name="nombre"
            value={editedStudent.nombre}
            onChange={handleChange}
            required
          />
        </Column>
        <Column>
          <Label>Apellido:</Label>
          <Input
            type="text"
            name="apellido"
            value={editedStudent.apellido}
            onChange={handleChange}
            required
          />
        </Column>
      </Row>
      <Row>
        <Column>
          <Label>Identificación:</Label>
          <Input
            type="text"
            name="identificacion"
            value={editedStudent.identificacion}
            onChange={handleChange}
            required
          />
        </Column>
        <Column>
          <Label>Grado de Cinturón:</Label>
          <Select
            name="gradoCinturon"
            value={editedStudent.gradoCinturon}
            onChange={handleChange}
            required
          >
            <option value="1Kyu">1 Kyu</option>
            <option value="2Kyu">2 Kyu</option>
            <option value="3Kyu">3 Kyu</option>
            <option value="4Kyu">4 Kyu</option>
            <option value="5Kyu">5 Kyu</option>
            <option value="6Kyu">6 Kyu</option>
            <option value="7Kyu">7 Kyu</option>
            <option value="8Kyu">8 Kyu</option>
            <option value="9Kyu">9 Kyu</option>
            <option value="1Dan">1 Dan</option>
            <option value="2Dan">2 Dan</option>
            <option value="3Dan">3 Dan</option>
          </Select>
        </Column>
      </Row>
      <Row>
        <Column>
          <Label>Email:</Label>
          <Input
            type="email"
            name="email"
            value={editedStudent.email}
            onChange={handleChange}
            required
          />
        </Column>
      </Row>
      <Row>
        <Column>
          <Label>EPS:</Label>
          <Input
            type="text"
            name="eps"
            value={editedStudent.eps}
            onChange={handleChange}
            required
          />
        </Column>
        <Column>
          <Label>Contacto:</Label>
          <Input
            type="text"
            name="contacto"
            value={editedStudent.contacto}
            onChange={handleChange}
            required
          />
        </Column>
      </Row>
      <ButtonRow>
        <Button type="submit">Guardar cambios</Button>
        <Button type="button" onClick={handleCancel}>
          Cancelar
        </Button>
      </ButtonRow>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
  font-size: 1.5rem;
  color: red;
  background: none;
  border: none;
  cursor: pointer;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Column = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => (props.type === 'submit' ? '#007bff' : '#ccc')};
  color: ${(props) => (props.type === 'submit' ? '#fff' : '#333')};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.type === 'submit' ? '#0056b3' : '#b3b3b3')};
  }
`;

export default EditarEstudiante;