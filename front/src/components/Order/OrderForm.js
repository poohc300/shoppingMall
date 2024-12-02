import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderForm = ({ price = 0, onCancel = (f) => f, onPlaceOrder = f => f }) => {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(price);

  useEffect(() => {
    const tempPrice = price * quantity;
    setTotalPrice(tempPrice);
  }, [quantity, price]);

  const handleChange = (e) => {
    if (e.target.value > 0) {
      setQuantity(Number(e.target.value));
    }
  };

  const handleOrder = () => {
    onPlaceOrder(quantity, totalPrice);

  };
  const handleCancel = () => {
    onCancel();
  };

  return (
    <div>
      <div className='orderForm'>
        <div className='quantity'>
          <div>
            <p>수량: {quantity}</p>
          </div>
          <div>
            <input type='number' value={quantity} onChange={handleChange} />
          </div>
        </div>
        <div className='totalPrice'>
          <p>금액: {totalPrice}</p>
        </div>
        <div className='orderButton'>
          <button onClick={handleOrder}>주문하기</button>
          <button onClick={handleCancel}>주문취소</button>
        </div>
      </div>
    </div>
  );
};
export default OrderForm;
