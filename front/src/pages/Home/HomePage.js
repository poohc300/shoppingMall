import React from 'react';
import * as styles from './Home.module.css'
import ProductList from '../../components/Product/ProductList';
import { useOutletContext } from 'react-router-dom';

const HomePage = () => {

  const searchQuery = useOutletContext();


  return (
    <div className={styles.homePage}>
      home 화면
      <div>검색어: {searchQuery}</div>
      <div className='recommendProductList'>

      </div>
      <div className='productList'>
        <ProductList searchQuery={searchQuery} />
      </div>
    </div>
  );
};
export default HomePage;
