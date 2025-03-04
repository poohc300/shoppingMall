import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import OrdersDetail from '../../components/Orders/OrdersDetail';
import * as styles from './OrdersPage.module.css';

const OrdersPage = () => {
  const location = useLocation();
  const productList = location.state.productList;

  return (
    <div className={styles.ordersPage}>
      <p>주문 화면</p>
      <div className={styles.main}>
        <OrdersDetail productList={productList} />
      </div>
    </div>
  );
};
export default OrdersPage;
