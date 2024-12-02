import React from 'react';
import OrderForm from './OrderFOrm';
import { useNavigate } from 'react-router-dom';

const OrderDetail = ({ product }) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/');
  };
  return (
    <div className='orderDetail'>
      <div className='productInfo'>
        <p>상품이름: {product.name}</p>
        <p>상품가격: {product.price}</p>
        <p>카테고리: {product.category}</p>
      </div>
      <div className='orderForm'>
        <OrderForm price={product.price} onCancel={handleCancel} />
      </div>
    </div>
  );
};
export default OrderDetail;
