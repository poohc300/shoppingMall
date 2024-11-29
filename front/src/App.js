import React from 'react';
import { Route, Routes } from 'react-router';
import { HashRouter, Link } from 'react-router-dom';
import Layout from './components/layout/Layout/Layout';
import './styles/App.css';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <div className='app'>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Layout />}></Route>
          <Route path='home' element={<HomePage />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
