import React from 'react';
import { Route, Routes } from 'react-router';
import { HashRouter, Link } from 'react-router-dom';
import Layout from './components/layout/Layout/Layout';
import './styles/App.css';

const App = () => {
  return (
    <div className='app'>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Layout />}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
