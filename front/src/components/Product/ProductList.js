import React from 'react';
import Product from './Product'

const ProductList = ({ products = [] }) => {
  return <div>
    <div className='productDetail'>

      {products.map((product) => {
        return <Product product={product} />
      })}
    </div>
  </div>;
};
export default ProductList;
