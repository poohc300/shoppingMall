import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import OrdersDetail from '../../components/Orders/OrdersDetail';

const OrdersPage = () => {
  const location = useLocation();
  console.log('받아온 상품 정보: ', location);
  const product = location.state.product;
  console.log(product);
  return (
    <div className='orderPage'>
      <p>주문 화면</p>
      <div className='main'>
        <OrdersDetail product={product} />
      </div>
    </div>
  );
};
export default OrdersPage;
