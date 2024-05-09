import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import { Estadisticas } from "../pages/Estadisticas";
import { Productos } from "../pages/Productos";
import { Diagramas } from "../pages/Diagramas";
import { Reportes } from "../pages/Reportes";
import Configuracion from "../pages/Configuracion";

export function MyRoutes({ isAuthenticated }) {
  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />} />
      <Route path="/" element={<Home />} />
      <Route path="/estadisticas" element={isAuthenticated ? <Estadisticas /> : <Navigate to="/login" />} />
      <Route path="/productos" element={isAuthenticated ? <Productos /> : <Navigate to="/login" />} />
      <Route path="/diagramas" element={isAuthenticated ? <Diagramas /> : <Navigate to="/login" />} />
      <Route path="/reportes" element={isAuthenticated ? <Reportes /> : <Navigate to="/login" />} />
      <Route path="/configuracion" element={isAuthenticated ? <Configuracion /> : <Navigate to="/login" />} />
    </Routes>
  );
}
