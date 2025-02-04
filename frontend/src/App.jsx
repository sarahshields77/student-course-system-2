import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Layout from './components/common/Layout';
import LandingPage from './components/LandingPage';
import RegisterForm from './components/RegisterForm';
import { ApolloProvider } from '@apollo/client';
import client from './apolloclient.js';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} /> 
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App
