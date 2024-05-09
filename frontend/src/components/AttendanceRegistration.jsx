import React, { useState } from 'react';
import styled from 'styled-components';


const AttendanceRegistration = ({ students, classes, onSubmit, showModal, setShowModal }) => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleStudentChange = (event) => {
    setSelectedStudent(event.target.value);
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedStudent || !selectedClass) {
      setErrorMessage('Por favor, seleccione todos los campos obligatorios.');
      return;
    }
    onSubmit(selectedStudent, selectedClass);
    setRegistrationMessage('Asistencia registrada');
    setTimeout(() => {
      setRegistrationMessage('');
      setShowModal(false);
    }, 3000);
  };

  // Filtrar todas las clases disponibles del día
  const todayClasses = classes.filter(cls => {
    const classDate = new Date(cls.date);
    const today = new Date();
    return classDate.getDate() === today.getDate() && classDate.getMonth() === today.getMonth() && classDate.getFullYear() === today.getFullYear();
  });

  return (
    <>
      <RegisterAttendanceButton onClick={() => setShowModal(true)}>Registrar Asistencia</RegisterAttendanceButton>
      {showModal && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={() => setShowModal(false)}>&times;</CloseButton>
            <ModalHeader>
              <h2>Registrar Asistencia</h2>
            </ModalHeader>
            {registrationMessage && <RegistrationMessage>{registrationMessage}</RegistrationMessage>}
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <div>
                  <label htmlFor="student">Estudiante:</label>
                  <Select id="student" value={selectedStudent} onChange={handleStudentChange}>
                    <option value="">Seleccionar estudiante</option>
                    {students.map(student => (
                      <option key={student._id} value={student._id}>{`${student.nombre} ${student.apellido}`}</option>
                    ))}
                  </Select>
                </div>
                <div>
                  <label htmlFor="class">Clase:</label>
                  <Select id="class" value={selectedClass} onChange={handleClassChange}>
                    <option value="">Seleccionar clase</option>
                    {todayClasses.map(cls => (
                      <option key={cls._id} value={cls._id}>{cls.name}</option>
                    ))}
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <SubmitButton type="submit">Registrar</SubmitButton>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

const RegisterAttendanceButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;
`;

const Modal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 30%;
  position: relative;
`;

const CloseButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
`;

const RegistrationMessage = styled.div`
  background-color: #28a745;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;
`;

const ErrorMessage = styled.div`
  background-color: #dc3545;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;
`;

export default AttendanceRegistration;
