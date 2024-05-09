import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import LoginPage from "./pages/LoginPage";  // Asegúrate de tener esta página para el login

import { Sidebar } from "./components/Sidebar";
import styled from "styled-components";
import { Light, Dark } from "./styles/Themes";
import { ThemeProvider } from "styled-components";
export const ThemeContext = React.createContext(null);

function App() {
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? Light : Dark;
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true");

  // Efecto para manejar la sesión al cargar la página
  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
  }, []);

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");  // Limpiar la sesión almacenada
    setIsAuthenticated(false);  // Actualizar el estado de autenticación
  };

  return (
    <>
      <ThemeContext.Provider value={{ setTheme, theme }}>
        <ThemeProvider theme={themeStyle}>
          <BrowserRouter>
            <Container className={sidebarOpen ? "sidebarState active" : ""}>
              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
              />
              <Routes>
                <Route path="/login" element={<LoginPage onLogin={() => setIsAuthenticated(true)} />} />
                <Route path="/" element={isAuthenticated ? <Home /> : <LoginPage onLogin={() => setIsAuthenticated(true)} />} />
                {/* Define otras rutas aquí */}
              </Routes>
            </Container>
          </BrowserRouter>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 90px auto;
  background: ${({ theme }) => theme.bgtotal};
  transition: all 0.3s;
  &.active {
    grid-template-columns: 300px auto;
  }
  color: ${({ theme }) => theme.text};
`;

export default App;
