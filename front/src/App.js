import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout/Layout';
import './styles/App.css';
import HomePage from './pages/Home/HomePage';

const App = () => {
  return (
    <div className='app'>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='home' element={<HomePage />} />
            {/* 다른 페이지 추가 */}
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
