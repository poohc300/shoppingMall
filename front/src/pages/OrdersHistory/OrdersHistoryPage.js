import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import OrdersHistory from '../../components/OrderHistory/OrdersHistory';
import * as styles from './OrdersHistoryPage.module.css';

const OrdersHistoryPage = () => {
  const location = useLocation();
  const orders = location.state.orders;

  return (
    <div className={styles.ordersHistoryPage}>
      <div>주문내역 페이지</div>
      <OrdersHistory orders={orders} />
    </div>
  );
};
export default OrdersHistoryPage;
