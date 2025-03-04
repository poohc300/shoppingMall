import React from 'react';
import ProductItem from './ProductItem';
import * as styles from './Product.module.css';

const ProductList = ({ products = [] }) => {
  return (
    <div className={styles.productList}>
      {products ? (
        products.map((product) => {
          return <ProductItem key={product.id} product={product} />;
        })
      ) : (
        <></>
      )}
    </div>
  );
};
export default ProductList;
