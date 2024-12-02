import React, { useState, useEffect } from 'react';

const OrdersProducts = ({ product = {} }) => {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product.price);
  useEffect(() => {
    const tempPrice = price * quantity;
    setTotalPrice(tempPrice);
  }, [quantity, product.price]);

  const handleChange = (e) => {
    if (e.target.value > 0) {
      setQuantity(Number(e.target.value));
    }
  };

  return (
    <div>
      <div className='orderForm'>
        <div className='productInfo'>
          <p>상품이름: {product.name}</p>
          <p>상품가격: {product.price}</p>
          <p>카테고리: {product.category}</p>
        </div>
        <div className='quantity'>
          <div>
            <p>수량: {quantity}</p>
          </div>
          <div>
            <input type='number' value={quantity} onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrdersProducts;
