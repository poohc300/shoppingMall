import React, { useState, useEffect } from 'react';

const OrdersProducts = ({ product = {}, onPriceChange = f => f }) => {
  const [quantity, setQuantity] = useState(1);

  const handleChange = (e) => {
    if (e.target.value > 0) {
      setQuantity(Number(e.target.value));
    }
  };

  useEffect(() => {
    const priceInfo = {
      id: product.id,
      price: product.price,
      quantity: quantity
    }
    onPriceChange(priceInfo)
  }, [quantity])
  /**
   * 여기 지금 총가격 구해서 ordersDetail에 줘야함 계산하게
   */
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
