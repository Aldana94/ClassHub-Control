import React from 'react';
import styled from 'styled-components';

const CredencialesPopup = ({ username, password, onClose }) => {
  const handleSendEmail = () => {
    fetch('http://localhost:5002/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: username, // Assuming username is used as email
        subject: "Bienvenido a Seishin Dojo",
        body: `¡Bienvenido a Seishin Dojo!\n\nTus credenciales de acceso son:\n\nUsuario: ${username}\nContraseña: ${password}`
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Email sent:', data);
    })
    .catch(error => {
      console.error('Error sending email:', error);
    });
  };

  return (
    <PopupOverlay>
      <PopupWrapper>
        <PopupHeader>
          <Title>Usuario creado</Title>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </PopupHeader>
        <PopupContent>
          <CredentialItem>
            <CredentialLabel>Usuario:</CredentialLabel>
            <CredentialValue>{username}</CredentialValue>
          </CredentialItem>
          <CredentialItem>
            <CredentialLabel>Contraseña:</CredentialLabel>
            <CredentialValue>{password}</CredentialValue>
          </CredentialItem>
          <ButtonContainer>
            <Button primary onClick={handleSendEmail}>
              Enviar mensaje por correo electrónico
            </Button>
            <Button onClick={onClose}>Cerrar</Button>
          </ButtonContainer>
        </PopupContent>
      </PopupWrapper>
    </PopupOverlay>
  );
};

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupWrapper = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 90%;
`;

const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #007bff;
  color: white;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const Title = styled.h2`
  margin: 0;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
`;

const PopupContent = styled.div`
  padding: 16px;
`;

const CredentialItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const CredentialLabel = styled.strong`
  font-weight: bold;
`;

const CredentialValue = styled.span``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: ${props => (props.primary ? '#007bff' : '#ccc')};
  color: ${props => (props.primary ? 'white' : '#333')};

  &:hover {
    background-color: ${props => (props.primary ? '#0056b3' : '#aaa')};
  }
`;

export default CredencialesPopup;
