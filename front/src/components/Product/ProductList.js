import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ products = [] }) => {
  return (
    <div>
      <div className='productDetail'>
        {products.map((product) => {
          return <ProductItem product={product} />;
        })}
      </div>
    </div>
  );
};
export default ProductList;
