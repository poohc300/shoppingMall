import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import OrdersDetail from '../../components/Orders/OrdersDetail';

const OrdersPage = () => {
  const location = useLocation();
  console.log('받아온 상품 정보: ', location);
  const productList = location.state.productList;
  console.log(productList);
  return (
    <div className='orderPage'>
      <p>주문 화면</p>
      <div className='main'>
        <OrdersDetail productList={productList} />
      </div>
    </div>
  );
};
export default OrdersPage;
