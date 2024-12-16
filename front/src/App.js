import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout/Layout';
import './styles/App.css';
import HomePage from './pages/Home/HomePage';
import OrdersPage from './pages/Orders/OrdersPage';
import CustomerPage from './pages/Customer/CustomerPage';
import OrdersHistoryPage from './pages/OrdersHistory/OrdersHistoryPage';
import AuthPage from './pages/Auth/AuthPage';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/Signup';

const App = () => {
  return (
    <div className='app'>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='order/:productId' element={<OrdersPage />} />
          </Route>
          <Route path='/customer' element={<Layout />}>
            <Route index element={<CustomerPage />} />
            <Route
              path='ordersHistory/:orderId'
              element={<OrdersHistoryPage />}
            />
          </Route>
          <Route path='/auth' element={<AuthPage />}>
            <Route path='login' element={<Login />}></Route>
            <Route path='signup' element={<SignUp />}></Route>
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
