import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

export function Estadisticas() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [enrolledStudents, setEnrolledStudents] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5002/users').then(response => {
      setStudents(response.data);
      setTotalStudents(response.data.length);
    });
  }, []);

  useEffect(() => {
    // Llamar a la función para obtener datos de asistencia y alumnos inscritos aquí
    // Puedes utilizar startDate, endDate y selectedStudent para filtrar los datos
    // Luego, actualiza attendanceData, enrolledStudents, etc. con los datos obtenidos
  }, [startDate, endDate, selectedStudent]);

  const handleStudentChange = (event) => {
    setSelectedStudent(event.target.value);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="container mx-auto px-4 py-5">
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard de Estadísticas</h1>
      <div className="flex justify-center gap-4 mb-6">
        <div>
          <label htmlFor="startDate" className="block text-gray-700 font-bold mb-2">Fecha Inicial</label>
          <DatePicker
            id="startDate"
            selected={startDate}
            onChange={date => setStartDate(date)}
            className="form-input px-4 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-gray-700 font-bold mb-2">Fecha Final</label>
          <DatePicker
            id="endDate"
            selected={endDate}
            onChange={date => setEndDate(date)}
            className="form-input px-4 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="student" className="block text-gray-700 font-bold mb-2">Estudiante</label>
          <select
            id="student"
            value={selectedStudent}
            onChange={handleStudentChange}
            className="form-select block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          >
            <option value="">Todos los estudiantes</option>
            {students.map(student => (
              <option key={student._id} value={student._id}>{student.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Alumnos Registrados</h2>
          <p className="text-4xl font-bold text-center">{totalStudents}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Alumnos Inscritos en la Clase</h2>
          <p className="text-4xl font-bold text-center">{enrolledStudents}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Asistencia por Alumno</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={attendanceData}
              dataKey="attendance"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {attendanceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Asistencia por Fecha</h2>
        <BarChart width={800} height={400} data={attendanceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="attendance" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
}