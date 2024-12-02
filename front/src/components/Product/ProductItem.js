import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductItem = ({ product = {} }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // product id를 path 로 해서 주문 상세 화면으로 이동
    navigate(`/order/${product.id}`, { state: { product: product } });
  };
  return (
    <div className='product' tabIndex={0} onClick={handleClick}>
      {/* <img src={product.image_url} /> */}
      <h2>{product.name}</h2>
      <p>{product.price}</p>
      <p>{product.description}</p>
    </div>
  );
};
export default ProductItem;
