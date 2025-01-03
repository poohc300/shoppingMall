import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout/Layout';
import './styles/App.css';
import HomePage from './pages/Home/HomePage';
import OrdersPage from './pages/Orders/OrdersPage';
import CustomerPage from './pages/Customer/CustomerPage';
import OrdersHistoryPage from './pages/OrdersHistory/OrdersHistoryPage';
import PaymentPage from './pages/Payment/PaymentPage';
import AuthPage from './pages/Auth/AuthPage';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/Signup';
import PaymentSuccess from './components/Payment/PaymentSuccess';
import PaymentFail from './components/Payment/PaymentFail';
import PrivateRoute from './pages/Routes/PrivateRoutes';
import AuthProvider from './pages/Routes/AuthProvider';

const App = () => {
  return (
    <div className='app'>
      <HashRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<PrivateRoute element={HomePage} />} />
              <Route
                path='order/:productId'
                element={<PrivateRoute element={OrdersPage} />}
              />
            </Route>
            <Route path='/customer' element={<Layout />}>
              <Route index element={<PrivateRoute element={CustomerPage} />} />
              <Route
                path='ordersHistory/:orderId'
                element={<PrivateRoute element={OrdersHistoryPage} />}
              />
            </Route>
            <Route path='/payment' element={<Layout />}>
              <Route index element={<PrivateRoute element={PaymentPage} />} />
              <Route
                path='success'
                element={<PrivateRoute element={PaymentSuccess} />}
              />
              <Route
                path='fail'
                element={<PrivateRoute element={PaymentFail} />}
              />
            </Route>
            <Route path='/auth' element={<AuthPage />}>
              <Route path='login' element={<Login />}></Route>
              <Route path='signup' element={<SignUp />}></Route>
            </Route>
          </Routes>
        </AuthProvider>
      </HashRouter>
    </div>
  );
};

export default App;
