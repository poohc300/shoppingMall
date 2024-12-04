import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as styles from './Product.module.css';

const ProductItem = ({ product = {} }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // product id를 path 로 해서 주문 상세 화면으로 이동
    navigate(`/order/${product.id}`, { state: { productList: [product] } });
  };
  return (
    <div className={styles.productItem} tabIndex={0} onClick={handleClick}>
      <img
        src={product.image_url}
        className={styles.productImage}
        alt={product.name}
      />
      <div className='content'>
        <h2>{product.name}</h2>
        <p>{product.price}</p>
        <p>{product.description}</p>
      </div>
    </div>
  );
};
export default ProductItem;
