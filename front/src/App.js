import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout/Layout';
import './styles/App.css';
import HomePage from './pages/Home/HomePage';
import OrdersPage from './pages/Orders/OrdersPage';

const App = () => {
  return (
    <div className='app'>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='order/:productId' element={<OrdersPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
