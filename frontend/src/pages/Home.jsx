// Home.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import AttendanceRegistration from '../components/AttendanceRegistration'; // Importa el nuevo componente

export function Home() {
  const [classes, setClasses] = useState([]);
  const [numStudents, setNumStudents] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setCurrentTime(new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Bogota' })));
    fetch('http://localhost:5002/classes')
      .then(response => response.json())
      .then(data => {
        const activeClasses = data.filter(cls => cls.isActive).map(cls => ({
          ...cls,
          date: new Date(cls.date).toLocaleString('en-US', { timeZone: 'America/Bogota' }),
          end: new Date(cls.end).toLocaleString('en-US', { timeZone: 'America/Bogota' })
        }));
        setClasses(activeClasses);
        fetchStudentsData(activeClasses);
      })
      .catch(error => console.error('Error fetching classes:', error));

    axios.get('http://localhost:5002/users')
      .then(response => setStudents(response.data))
      .catch(error => console.error('Error fetching students:', error));

    const intervalId = setInterval(() => {
      setCurrentTime(new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Bogota' })));
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchStudentsData = (classes) => {
    const numStudentsData = {};
    classes.forEach(cls => {
      fetch(`http://localhost:5002/classes/${cls._id}/students`)
        .then(response => response.json())
        .then(data => {
          numStudentsData[cls._id] = data.numStudents;
          setNumStudents(prevState => ({ ...prevState, ...numStudentsData }));
        })
        .catch(error => console.error(`Error fetching students for class ${cls._id}:`, error));
    });
  };

  const isToday = (date) => {
    const classDate = new Date(date);
    const today = new Date(currentTime);
    return classDate.getDate() === today.getDate() && classDate.getMonth() === today.getMonth() && classDate.getFullYear() === today.getFullYear();
  };

  const todayClasses = classes.filter(cls => isToday(cls.date));

  const handleSubmit = (selectedStudent, selectedClass) => {
    axios.post('http://localhost:5002/attendance', {
      userId: selectedStudent,
      classId: selectedClass,
    })
      .then(response => {
        console.log('Asistencia registrada:', response.data);
        setShowModal(false);
      })
      .catch(error => console.error('Error registering attendance:', error));
  };

  return (
    <Container>
      <Title>Organización Seishin Dojo</Title>
      <DateTime>
        <p>Hora actual: {currentTime.toLocaleTimeString('en-US', { timeZone: 'America/Bogota', hour12: true })}</p>
        <p>Fecha: {currentTime.toLocaleDateString('en-US', { timeZone: 'America/Bogota' })}</p>
      </DateTime>
      <ClassesList>
        <ClassesHeader>
          <h2>Clases del día</h2>
          {/* Usa el nuevo componente */}
          <AttendanceRegistration
            students={students}
            classes={classes}
            onSubmit={handleSubmit}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </ClassesHeader>
        {todayClasses.length > 0 ? (
          todayClasses.map(cls => (
            <ClassItem key={cls._id}>
              <ClassTitle>{cls.name}</ClassTitle>
              <ClassDetails>
                <p>Horario de inicio: {new Date(cls.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                <p>Horario de fin: {new Date(cls.end).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                <p>Alumnos registrados: {numStudents[cls._id] || 0}</p>
              </ClassDetails>
            </ClassItem>
          ))
        ) : (
          <p>No hay clases programadas para hoy.</p>
        )}
      </ClassesList>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  color: #333;
`;

const DateTime = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #666;
`;

const ClassesList = styled.div`
  width: 100%;
`;

const ClassItem = styled.div`
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const ClassTitle = styled.h3`
  font-size: 1.5rem;
  color: #007bff;
  margin: 0;
`;

const RegisterAttendanceButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top;
`;

const ClassesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ClassDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export default Home;