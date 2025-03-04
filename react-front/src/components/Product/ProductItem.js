import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as styles from './Product.module.css';
import moment from 'moment';

const ProductItem = ({ product = {} }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/order/${product.id}`, { state: { productList: [product] } });
  };

  useEffect(() => {}, [product]);
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
        <p>{moment(product.created_at).format('YYYY-MM-MM A hh:mm:ss')}</p>
      </div>
    </div>
  );
};
export default ProductItem;
