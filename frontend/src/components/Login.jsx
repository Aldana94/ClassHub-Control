import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthService from '../services/AuthService';  

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;  
  gap: 25px;
  padding: 30px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.1);
 
`;

const Input = styled.input`
  padding: 12px;
  border: 2px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s;

  &:focus {
    border-color: #2980b9;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #2980b9;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #21618c;
    transform: translateY(-2px);
  }
`;

const Message = styled.p`
  color: ${props => props.error ? '#e74c3c' : '#2ecc71'};
`;

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await AuthService.login(username, password);
      onLogin(true);  // Notifica a la aplicación que el usuario está autenticado
      navigate('/', { replace: true });  // Redirecciona a la raíz
    } catch (error) {
      setError('Incorrect username or password.');
    }
  };
  

  return (
    <LoginForm onSubmit={handleSubmit}>
      <Input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <Button type="submit">Login</Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </LoginForm>
  );
}


export default Login;
