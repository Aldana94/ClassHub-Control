import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../components/Login';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg,  #ffffff);
  background-size: cover;
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 2.5rem;
  text-shadow: 2px 2px 5px rgba(44, 62, 80, 0.2);
  margin-bottom: 20px;
`;

function LoginPage({ isAuthenticated, onLogin }) {
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <PageContainer>
      <Title>Login</Title>
      <Login onLogin={onLogin} />
    </PageContainer>
  );
}

export default LoginPage;
