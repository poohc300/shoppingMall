import React from 'react';
import OrderForm from './OrderFOrm';
import { useNavigate } from 'react-router-dom';

const OrderDetail = ({ product }) => {
  const navigate = useNavigate();
  const url = "http://localhost:8081/order/"
  const handleCancel = () => {
    navigate('/');
  };

  const handleOrder = (totalPrice, quantity) => {
    console.log("주문하기 클릭시 정보: ", totalPrice, quantity, product);
    const data = {
      customer_id: 1,
      product_id: product.id,
      price: product.price,
      category: product.category,
      totalPrice: totalPrice,
      quantity: quantity
    }
    fetch(url + 'save', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then(data => console.log('success', data))
      .catch((error) => console.log(error))
  }

  return (
    <div className='orderDetail'>
      <div className='productInfo'>
        <p>상품이름: {product.name}</p>
        <p>상품가격: {product.price}</p>
        <p>카테고리: {product.category}</p>
      </div>
      <div className='orderForm'>
        <OrderForm price={product.price} onCancel={handleCancel} onPlaceOrder={handleOrder} />
      </div>
    </div>
  );
};
export default OrderDetail;
