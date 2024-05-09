import React, { useState } from 'react';
import styled from 'styled-components';
import EditarEstudiante from '../components/EditarEstudiante';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerAlumnos = ({ students, handleViewDetails, setStudents }) => {
  const [editingStudent, setEditingStudent] = useState(null);

  const handleEditClick = (student) => {
    setEditingStudent(student);
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  const handleDelete = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:5002/users/${studentId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student._id !== studentId)
        );
        toast.success('Estudiante eliminado correctamente');
      } else {
        console.error('Error al eliminar el estudiante:', response.status);
        toast.error('Error al eliminar el estudiante');
      }
    } catch (error) {
      console.error('Error al eliminar el estudiante:', error);
      toast.error('Error al eliminar el estudiante');
    }
  };

  const handleEdit = async (editedStudent) => {
    try {
      const response = await fetch(`http://localhost:5002/users/${editedStudent._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedStudent),
      });

      if (response.ok) {
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student._id === editedStudent._id ? editedStudent : student
          )
        );
        toast.success('¡Estudiante actualizado correctamente!');
      } else {
        console.error('Error al actualizar el estudiante:', response.status);
        toast.error('Error al actualizar el estudiante');
      }
    } catch (error) {
      console.error('Error al actualizar el estudiante:', error);
      toast.error('Error al actualizar el estudiante');
    }
  };

  return (
    <div>
      <h2>Lista de Estudiantes</h2>
      {editingStudent ? (
        <EditarEstudiante
          student={editingStudent}
          handleEdit={handleEdit}
          handleCancelEdit={handleCancelEdit}
        />
      ) : (
        <Table>
          <thead>
            <tr>
              <TableHeader>Nombre</TableHeader>
              <TableHeader>Apellido</TableHeader>
              <TableHeader>Identificación</TableHeader>
              <TableHeader>Grado de Cinturón</TableHeader>
              <TableHeader>Acciones</TableHeader>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <TableRow key={student._id}>
                <TableCell>{student.nombre}</TableCell>
                <TableCell>{student.apellido}</TableCell>
                <TableCell>{student.identificacion}</TableCell>
                <TableCell>{student.gradoCinturon}</TableCell>
                <TableCell>
                  <ActionButton onClick={() => handleViewDetails(student)}>
                    Ver Detalles
                  </ActionButton>
                  <ActionButton onClick={() => handleEditClick(student)}>
                    Editar
                  </ActionButton>
                  <ActionButton onClick={() => handleDelete(student._id)}>
                    Eliminar
                  </ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}
      <ToastContainer />
    </div>
  );
};

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
  background-color: #f3f3f3;
  border-radius: 10px;
  overflow: hidden;
`;

const TableHeader = styled.th`
  padding: 12px 15px;
  text-align: left;
  background-color: #007bff;
  color: #fff;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #e8e8e8;
  }
`;

const TableCell = styled.td`
  padding: 12px 15px;
`;

const ActionButton = styled.button`
  padding: 8px 12px;
  margin-right: 5px;
  font-size: 0.9rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

export default VerAlumnos;
