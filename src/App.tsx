import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import GlobalStyle from './styles/global';
import Animations from './styles/animations';

import { AuthProvider } from './hooks/auth';

import Routes from './routes';

const App: React.FC = () => (
  <Router>
    <AuthProvider>
      <Routes />
    </AuthProvider>

    <GlobalStyle />
    <Animations />
    <ToastContainer autoClose={3000} />
  </Router>
);

export default App;
