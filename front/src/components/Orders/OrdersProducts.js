import React, { useState, useEffect } from 'react';
import * as styles from './Orders.module.css';

const OrdersProducts = ({ product = {}, onPriceChange = (f) => f }) => {
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
      quantity: quantity,
    };
    onPriceChange(priceInfo);
  }, [quantity]);

  return (
    <div className={styles.orderProduct}>
      <div className={styles.productInfo}>
        <p>상품이름: {product.name}</p>
        <p>상품가격: {product.price}</p>
        <div className={styles.quantity}>
          <div>
            <p>수량: {quantity}</p>
          </div>
          <div>
            <input type='number' value={quantity} onChange={handleChange} />
          </div>
        </div>
        <img
          src={product.image_url}
          style={{ height: '275px', marginTop: '10px' }}
        />
      </div>
    </div>
  );
};
export default OrdersProducts;
