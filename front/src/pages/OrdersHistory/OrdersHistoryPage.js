import React from 'react';
import { useLocation } from 'react-router-dom';

const OrdersHistoryPage = () => {
  const location = useLocation();
  const orders = location.state.orders;

  return <div>주문내역 페이지</div>;
};
export default OrdersHistoryPage;
