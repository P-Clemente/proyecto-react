import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider,createTheme } from '@material-ui/core';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { App } from './components/App';
import { Users } from './components/Users';
import { Login } from './components/Login';
import './index.css'

const theme = createTheme({
  spacing: 2,
  palette: {
    primary: {main: '#FF8C00', light: '#fff', dark: '#CC5500', contrastText: '#000',  },
    secondary: {main: '#CC5500', light: '#C19A6B', dark: '#CC5500', contrastText: '#C19A6B', },
    black: {main: '#000', light: '#fff', dark: '#000', contrastText: '#fff', },
    white: {main: '#fff', light: '#000', dark: '#fff', contrastText: '#000'  }
  }
})

// Función para verificar autenticación
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null; // Retorna true si hay un token
};

ReactDOM.render(
  
  <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        
        <Route path="/" element = {<App/>}/>
        <Route path="/login" element={<Login/>} /> 
        <Route path="/users" element={isAuthenticated() ? <Users /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  </ThemeProvider>,
  document.getElementById('root')

);



